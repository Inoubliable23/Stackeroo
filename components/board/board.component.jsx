import React, { Component } from 'react';
import { BoardContainer } from './board.styles';
import BoardRow from '../board-row/board-row.component';
import { connect } from 'react-redux';
import { gameOver, setFinalScore } from '../../redux/game/game.actions';

class Board extends Component {

	tickInterval = undefined;
	rows = 15;
	columns = 10;
	startingPlayerWidth = 4;
	playerWidth = undefined;
	startingPosition = {
		row: 0,
		column: 4,
		isTurnedLeft: false
	}
	currentPosition = {};

	constructor(props) {
		super(props);

		this.state = {
			rowsDataArray: []
		}
	}

	componentDidMount() {
		this.resetPosition();
		this.startGameLoop();
	}

	componentDidUpdate(prevProps) {
		if (!this.props.isGameOver && prevProps.isGameOver) {
			this.resetBoard();
			this.resetPosition();
			this.startGameLoop();
		}
	}

	componentWillUnmount() {
		clearInterval(this.tickInterval);
	}

	startGameLoop() {
		clearInterval(this.tickInterval);
		this.tickInterval = setInterval(() => {
			this.tick();
		}, 70);
	}

	getNewPosition() {
		if (this.currentPosition.isTurnedLeft) {
			const newColumnPosition = this.currentPosition.column - 1;
			if (newColumnPosition < 0) {
				return {
					...this.currentPosition,
					column: this.currentPosition.column + 1,
					isTurnedLeft: false
				}
			}

			return {
				...this.currentPosition,
				column: newColumnPosition
			}
		}

		const newColumnPosition = this.currentPosition.column + 1;
		if (newColumnPosition > (this.columns - this.playerWidth + 1)) {
			return {
				...this.currentPosition,
				column: this.currentPosition.column - 1,
				isTurnedLeft: true
			}
		}

		return {
			...this.currentPosition,
			column: newColumnPosition
		}
	}
	
	tick() {
		this.currentPosition = this.getNewPosition();

		let rowsDataArray = [];
		for(let i = 0; i < this.rows; i++) {

			if (i > (this.rows - (this.currentPosition.row + 1))) {
				rowsDataArray.push(this.state.rowsDataArray[i]);
				continue;
			}

			let rowDataArray = [];
			for(let j = 0; j <= this.columns; j++) {
				let isActive = false;
				const isInRow = i === (this.rows - (this.currentPosition.row + 1));
				if (isInRow) {
					const isInColumn = j >= this.currentPosition.column && j < (this.currentPosition.column + this.playerWidth);
					if (isInColumn) {
						isActive = true;
					}
				}
				rowDataArray.push({
					isActive: isActive
				});
			}
			rowsDataArray.push(rowDataArray);
		}

		this.setState({
			rowsDataArray: rowsDataArray
		});
	}

	resetPosition() {
		this.currentPosition = this.startingPosition;
		this.playerWidth = this.startingPlayerWidth;
	}

	resetBoard() {
		let emptyBoard = [];
		for(let i = 0; i < this.rows; i++) {
			let emptyRow = [];
			for(let j = 0; j <= this.columns; j++) {
				emptyRow.push({
					isActive: false
				});
			}
			emptyBoard.push(emptyRow);
		}

		this.setState({
			rowsDataArray: emptyBoard
		});
	}

	endGame() {
		clearInterval(this.tickInterval);

		this.props.setFinalScore(this.currentPosition.row);
		this.props.gameOver();
	}

	handleTouch() {
		const currentRowNum = this.currentPosition.row;

		const currentRow = this.state.rowsDataArray[this.rows - (currentRowNum + 1)];
		if (currentRowNum > 0) {
			const previousRow = this.state.rowsDataArray[this.rows - currentRowNum];

			let newPlayerLength = 0;
			let newPlayerPositionColumn = this.currentPosition.column;
			let modifiedCurrentRow = currentRow.map((circle, i) => {
				if (circle.isActive && previousRow[i].isActive) {
					if (newPlayerLength === 0) {
						newPlayerPositionColumn = i;
					}
					newPlayerLength += 1;
					return {
						isActive: true
					}
				}

				return {
					isActive: false
				}
			});

			const modifiedRowsDataArray = this.state.rowsDataArray.map((row, i) => {
				if (i === this.rows - (currentRowNum + 1)) return modifiedCurrentRow;

				return row;
			});
			
			if (newPlayerLength === 0) {
				this.endGame();
				return;
			}
			this.playerWidth = newPlayerLength;
			this.currentPosition.column = newPlayerPositionColumn;
			this.setState({
				rowsDataArray: modifiedRowsDataArray
			});
			if (currentRowNum >= this.rows - 1) {
				this.endGame();
				return;
			}
		}

		this.currentPosition.row = currentRowNum + 1;
	}

	render() {
		return (
			<BoardContainer onTouchStart={() => this.handleTouch()} onMouseDown={() => this.handleTouch()}>
				{
					this.state.rowsDataArray.map((rowData, index) => <BoardRow key={index} rowData={rowData} />)
				}
			</BoardContainer>
		);
	}
}

const mapStateToProps = state => ({
	isGameOver: state.game.isGameOver
});

const mapDispatchToProps = dispatch => ({
	gameOver: () => dispatch(gameOver()),
	setFinalScore: score => dispatch(setFinalScore(score))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);