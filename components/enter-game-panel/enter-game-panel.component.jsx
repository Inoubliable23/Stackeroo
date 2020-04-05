import React, { Component } from 'react';
import { InstructionsText, EnterGamePanelContainer } from './enter-game-panel.styles';

class EnterGamePanel extends Component {

	render() {
		return (
			<EnterGamePanelContainer>
				<InstructionsText>TOUCH TO START</InstructionsText>
			</EnterGamePanelContainer>
		);
	}
}

export default EnterGamePanel;