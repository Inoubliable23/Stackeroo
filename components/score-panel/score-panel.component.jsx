import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { ScorePanelContainer, FinalScore, BestScore } from './score-panel.styles';
import { startGame } from '../../redux/game/game.actions';

const ScorePanel = ({ startGame, finalScore }) => {
	return (
		<ScorePanelContainer onTouchStart={() => startGame()} onClick={() => startGame()}>
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

const mapDispatchToProps = dispatch => ({
	startGame: () => dispatch(startGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(ScorePanel);