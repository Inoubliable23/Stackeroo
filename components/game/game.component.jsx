import React from 'react';
import { GameContainer, ScorePanelContainer, BoardContainer } from './game.styles';
import Board from '../board/board.component';
import ScorePanel from '../score-panel/score-panel.component';

const Game = () => {
	return (
		<GameContainer>
			<ScorePanelContainer>
				<ScorePanel />
			</ScorePanelContainer>
			<BoardContainer>
				<Board />
			</BoardContainer>
		</GameContainer>
	);
}

export default Game;