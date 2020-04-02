import gameActionTypes from './game.types';

const initialState = {
	isGameOver: false,
	finalScore: null,
	tapHappened: false
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
	case gameActionTypes.TAP_HAPPENED:
		return {
			...state,
			tapHappened: true
		}
	case gameActionTypes.TAP_HANDLED:
		return {
			...state,
			tapHappened: false
		}

	default:
		return state;
	}
}
