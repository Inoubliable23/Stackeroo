import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { ScorePanelContainer, Score, BestScore } from './score-panel.styles';

const ScorePanel = ({ score, bestScore, isNewBestScore }) => {
	return (
		<ScorePanelContainer>
			{
				score ?
				<View>
					<Score>{score}</Score>
					{
						bestScore ?
							isNewBestScore ?
							<BestScore>NEW RECORD!</BestScore>
							:
							<BestScore>BEST {bestScore}</BestScore>
						:
						null
					}
				</View>
				:
				null
			}
		</ScorePanelContainer>
	);
}

const mapStateToProps = state => ({
	score: state.game.score,
	bestScore: state.game.bestScore,
	isNewBestScore: state.game.isNewBestScore
});

export default connect(mapStateToProps)(ScorePanel);