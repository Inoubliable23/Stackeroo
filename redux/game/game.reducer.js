import gameActionTypes from './game.types';

const initialState = {
	isGameOver: true,
	finalScore: null
}

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case gameActionTypes.GAME_OVER:
		return {
			...state,
			isGameOver: true
		}
	case gameActionTypes.START_GAME:
		return {
			...state,
			isGameOver: false,
			finalScore: null
		}
	case gameActionTypes.SET_FINAL_SCORE:
		return {
			...state,
			finalScore: payload
		}

	default:
		return state;
	}
}
