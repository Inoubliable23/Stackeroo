import { storeData, fetchData } from '../../database/database';
import { START_GAME, GAME_OVER, SET_BEST_SCORE, SET_BEST_SCORE_TO_DB_START, SET_BEST_SCORE_TO_DB_SUCCESS, SET_BEST_SCORE_TO_DB_FAILURE, GET_BEST_SCORE_FROM_DB_START, GET_BEST_SCORE_FROM_DB_SUCCESS, GET_BEST_SCORE_FROM_DB_FAILURE, TAP_HAPPENED, TAP_HANDLED, SET_SCORE, ENTER_GAME } from './game.types';

export const enterGame = () => ({
	type: ENTER_GAME
});

export const startGame = () => ({
	type: START_GAME
});

export const gameOver = () => ({
	type: GAME_OVER
});

export const setBestScore = score => dispatch => {
	dispatch(setBestScoreToStore(score));
	dispatch(setBestScoreToDb(score));
};

const setBestScoreToStore = score => ({
	type: SET_BEST_SCORE,
	payload: score
});

const setBestScoreToDb = score => async dispatch => {
	dispatch(setBestScoreToDbStart());

	try {
		await storeData('BEST_SCORE', score);
		dispatch(setBestScoreToDbSuccess());
	} catch (error) {
		dispatch(setBestScoreToDbFailure(error));
	}
};

const setBestScoreToDbStart = () => ({
	type: SET_BEST_SCORE_TO_DB_START
});

const setBestScoreToDbSuccess = () => ({
	type: SET_BEST_SCORE_TO_DB_SUCCESS
});

const setBestScoreToDbFailure = error => ({
	type: SET_BEST_SCORE_TO_DB_FAILURE,
	payload: error
});

export const getBestScoreFromDb = () => async dispatch => {
	dispatch(getBestScoreFromDbStart());

	try {
		const bestScore = await fetchData('BEST_SCORE');
		dispatch(getBestScoreFromDbSuccess(bestScore));
	} catch (error) {
		dispatch(getBestScoreFromDbFailure(error));
	}
};

const getBestScoreFromDbStart = () => ({
	type: GET_BEST_SCORE_FROM_DB_START
});

const getBestScoreFromDbSuccess = score => ({
	type: GET_BEST_SCORE_FROM_DB_SUCCESS,
	payload: score
});

const getBestScoreFromDbFailure = error => ({
	type: GET_BEST_SCORE_FROM_DB_FAILURE,
	payload: error
});

export const setScore = score => ({
	type: SET_SCORE,
	payload: score
});

export const tapHappened = () => ({
	type: TAP_HAPPENED
});

export const tapHandled = () => ({
	type: TAP_HANDLED
});