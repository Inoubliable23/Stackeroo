import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { store } from './redux/store';
import Game from './components/game/game.component';
import { removeData } from './database/database';

const AppContainer = styled.View`
	flex: 1;
	background-color: #111;
	padding-top: 30px;
`

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
		// removeData('BEST_SCORE');
	});

  return (
    <Provider store={store}>
			<AppContainer>
				<Game />
			</AppContainer>
		</Provider>
  );
};

export default App;