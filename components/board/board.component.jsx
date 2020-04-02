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
	rowsDataArray = [];
	hasTouched = false;

	componentDidMount() {
		this.resetBoard();
		this.startGameLoop();
	}

	componentDidUpdate(prevProps) {
		if (!this.props.isGameOver && prevProps.isGameOver) {
			this.resetBoard();
		}
	}

	componentWillUnmount() {
		
	}

	startGameLoop() {
		requestAnimationFrame(this.gameLoop.bind(this));
	}

	lastTime = Date.now();
	gameLoop(timestamp) {
		const timeDiff = timestamp - this.lastTime;
		if (timeDiff > 65) {
			this.updateAndDraw();
			this.lastTime = timestamp;
			console.log(timeDiff);
		}

		requestAnimationFrame(this.gameLoop.bind(this));
	}

	updateAndDraw() {
		this.update();
		this.draw();
	}

	update() {
		if (this.hasTouched) {
			this.updateAfterTouch();
			this.hasTouched = false;
		}

		if (this.props.isGameOver) return;

		this.currentPosition = this.getNewPosition();

		let rowDataArray = [];
		for(let i = 0; i < this.columns; i++) {
			let isActive = false;
			const isInColumn = i >= this.currentPosition.column && i < (this.currentPosition.column + this.playerWidth);
			if (isInColumn) {
				isActive = true;
			}
			rowDataArray.push({
				isActive: isActive
			});
		}
		this.rowsDataArray[this.rows - (this.currentPosition.row + 1)] = rowDataArray;
	}

	draw() {
		this.forceUpdate();
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
		if (newColumnPosition > (this.columns - this.playerWidth)) {
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

	updateAfterTouch() {
		if (this.props.isGameOver) return;

		const currentRowNum = this.currentPosition.row;

		const currentRow = this.rowsDataArray[this.rows - (currentRowNum + 1)];
		if (currentRowNum > 0) {
			const previousRow = this.rowsDataArray[this.rows - currentRowNum];

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

			const modifiedRowsDataArray = this.rowsDataArray.map((row, i) => {
				if (i === this.rows - (currentRowNum + 1)) return modifiedCurrentRow;

				return row;
			});
			
			if (newPlayerLength === 0) {
				this.endGame();
				return;
			}
			this.playerWidth = newPlayerLength;
			this.currentPosition.column = newPlayerPositionColumn;
			this.rowsDataArray = modifiedRowsDataArray;
			if (currentRowNum >= this.rows - 1) {
				this.endGame();
				return;
			}
		}

		this.currentPosition.row = currentRowNum + 1;
	}

	resetBoard() {
		this.currentPosition = this.startingPosition;
		this.playerWidth = this.startingPlayerWidth;

		let rowsDataArray = [];
		for(let i = 0; i < this.rows; i++) {
			let rowDataArray = [];
			const isInRow = i === (this.rows - (this.currentPosition.row + 1));
			for(let j = 0; j < this.columns; j++) {
				let isActive = false;
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

		this.rowsDataArray = rowsDataArray;
	}

	endGame() {
		this.props.setFinalScore(this.currentPosition.row);
		this.props.gameOver();
	}

	handleTouch() {
		this.hasTouched = true;
	}

	render() {
		return (
			<BoardContainer onTouchStart={() => this.handleTouch()} onMouseDown={() => this.handleTouch()}>
				{
					this.rowsDataArray.map((rowData, index) => <BoardRow key={index} rowData={rowData} />)
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