import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameContainer, PanelContainer, BoardContainer } from './game.styles';
import Board from '../board/board.component';
import ScorePanel from '../score-panel/score-panel.component';
import { tapHappened, startGame, getBestScoreFromDb, enterGame } from '../../redux/game/game.actions';
import EnterGamePanel from '../enter-game-panel/enter-game-panel.component';

class Game extends Component {

	componentDidMount() {
		this.props.getBestScoreFromDb();
	}

	handleTouch = () => {
		const { hasEnteredGame, isGameOver, tapHappened, startGame, enterGame } = this.props;
		if (!hasEnteredGame) {
			enterGame();
			return;
		}

		if (!isGameOver) {
			tapHappened();
			return;
		}

		startGame();
	}

	render() {
		const { hasEnteredGame } = this.props;
		return (
			<GameContainer onTouchStart={this.handleTouch}>
				<PanelContainer>
				{
					hasEnteredGame ?
					<ScorePanel />
					:
					<EnterGamePanel />
				}
				</PanelContainer>
				<BoardContainer>
					<Board />
				</BoardContainer>
			</GameContainer>
		);
	}
}

const mapStateToProps = state => ({
	isGameOver: state.game.isGameOver,
	hasEnteredGame: state.game.hasEnteredGame
});

const mapDispatchToProps = {
	tapHappened,
	startGame,
	getBestScoreFromDb,
	enterGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);