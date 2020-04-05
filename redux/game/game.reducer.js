import { GAME_OVER, START_GAME, SET_BEST_SCORE, SET_BEST_SCORE_TO_DB_START, SET_BEST_SCORE_TO_DB_SUCCESS, SET_BEST_SCORE_TO_DB_FAILURE, GET_BEST_SCORE_FROM_DB_START, GET_BEST_SCORE_FROM_DB_SUCCESS, GET_BEST_SCORE_FROM_DB_FAILURE, SET_SCORE, TAP_HAPPENED, TAP_HANDLED, ENTER_GAME } from './game.types';

const initialState = {
	hasEnteredGame: false,
	isGameOver: false,
	score: null,
	bestScore: null,
	isNewBestScore: false,
	isSavingScore: false,
	isFetchingScore: false,
	tapHappened: false
}

export default (state = initialState, { type, payload }) => {
	switch (type) {

		case ENTER_GAME:
			return {
				...state,
				hasEnteredGame: true
			}
		case GAME_OVER:
			return {
				...state,
				isGameOver: true
			}
		case START_GAME:
			return {
				...state,
				isGameOver: false,
				score: null,
				isNewBestScore: false
			}

		case SET_BEST_SCORE:
			return {
				...state,
				bestScore: payload,
				isNewBestScore: true
			}
		case SET_BEST_SCORE_TO_DB_START:
			return {
				...state,
				isSavingScore: true
			}
		case SET_BEST_SCORE_TO_DB_SUCCESS:
			return {
				...state,
				isSavingScore: false
			}
		case SET_BEST_SCORE_TO_DB_FAILURE:
			return {
				...state,
				isSavingScore: false
			}

		case GET_BEST_SCORE_FROM_DB_START:
			return {
				...state,
				isFetchingScore: true
			}
		case GET_BEST_SCORE_FROM_DB_SUCCESS:
			return {
				...state,
				bestScore: payload,
				isFetchingScore: false
			}
		case GET_BEST_SCORE_FROM_DB_FAILURE:
			return {
				...state,
				isFetchingScore: false
			}

		case SET_SCORE:
			return {
				...state,
				score: payload
			}

		case TAP_HAPPENED:
			return {
				...state,
				tapHappened: true
			}
		case TAP_HANDLED:
			return {
				...state,
				tapHappened: false
			}

		default:
			return state;
	}
}
