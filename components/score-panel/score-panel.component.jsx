import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { ScorePanelContainer, Score, BestScore } from './score-panel.styles';

const ScorePanel = ({ score, bestScore, isGameOver }) => {
	return (
		<ScorePanelContainer>
			<View>
			<Score>{score}</Score>
			{
				bestScore ?
					isGameOver && score > bestScore ?
					<BestScore>NEW RECORD!</BestScore>
					:
					<BestScore>BEST {bestScore}</BestScore>
				:
				null
			}
			</View>
		</ScorePanelContainer>
	);
}

const mapStateToProps = state => ({
	score: state.game.score,
	bestScore: state.game.bestScore,
	isGameOver: state.game.isGameOver
});

export default connect(mapStateToProps)(ScorePanel);