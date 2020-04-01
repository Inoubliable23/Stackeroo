import gameActionTypes from './game.types';

export const startGame = () => ({
	type: gameActionTypes.START_GAME
});

export const gameOver = () => ({
	type: gameActionTypes.GAME_OVER
});

export const setFinalScore = finalScore => ({
	type: gameActionTypes.SET_FINAL_SCORE,
	payload: finalScore
});