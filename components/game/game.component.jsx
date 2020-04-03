import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameContainer, ScorePanelContainer, BoardContainer } from './game.styles';
import Board from '../board/board.component';
import ScorePanel from '../score-panel/score-panel.component';
import { tapHappened, startGame } from '../../redux/game/game.actions';

class Game extends Component {

	handleTouch() {
		const { isGameOver, tapHappened, startGame } = this.props;
		if (!isGameOver) {
			tapHappened();
			return;
		}

		startGame();
	}

	render() {
		return (
			<GameContainer onTouchStart={() => this.handleTouch()}>
				<ScorePanelContainer>
					<ScorePanel />
				</ScorePanelContainer>
				<BoardContainer>
					<Board />
				</BoardContainer>
			</GameContainer>
		);
	}
}

const mapStateToProps = state => ({
	isGameOver: state.game.isGameOver
});

const mapDispatchToProps = {
	tapHappened,
	startGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);