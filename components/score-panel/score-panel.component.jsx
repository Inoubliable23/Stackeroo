import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { ScorePanelContainer, FinalScore, BestScore } from './score-panel.styles';

const ScorePanel = ({ finalScore }) => {
	return (
		<ScorePanelContainer>
			{
				finalScore ?
				<View>
					<FinalScore>{finalScore}</FinalScore>
					<BestScore>BEST {68}</BestScore>
				</View>
				:
				null
			}
		</ScorePanelContainer>
	);
}

const mapStateToProps = state => ({
	finalScore: state.game.finalScore
});

export default connect(mapStateToProps)(ScorePanel);