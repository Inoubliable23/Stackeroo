import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated } from 'react-native';
import { ScorePanelContainer, Score, BestScore } from './score-panel.styles';

class ScorePanel extends Component {

	state = {
		fadeAnimation: new Animated.Value(0),
		score: null
	};

	static getDerivedStateFromProps(nextProps) {
		if (nextProps.score > 0) {
			return {
				score: nextProps.score
			}
		}

		return {};
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.score && !prevProps.score) {
			this.fadeIn();
		}
		if (!this.props.score && prevProps.score) {
			this.fadeOut();
		}
	}

  fadeIn = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
			duration: 2000,
			useNativeDriver: true
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 0,
			duration: 200,
			useNativeDriver: true
    }).start(() => {
			this.setState({
				score: this.props.score
			});
		});
  };

	render() {
		const { bestScore, isNewBestScore } = this.props;
		const { score } = this.state;
		return (
			<ScorePanelContainer>
				<Animated.View
					style={[{
						opacity: this.state.fadeAnimation
					}]}
				>
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
				</Animated.View>
			</ScorePanelContainer>
		);
	}
}

const mapStateToProps = state => ({
	score: state.game.score,
	bestScore: state.game.bestScore,
	isNewBestScore: state.game.isNewBestScore
});

export default connect(mapStateToProps)(ScorePanel);