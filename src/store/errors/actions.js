
import {
	CLEAR_ERRORS,
	SET_ERRORS,
} from './types';   

import { Error } from '../../components/common/toastify';

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};

export const setErrors = (err) => {
	Error(err && err.response && err.response.data ? err.response.data.message : "Something went wrong! Please try again.");
	return {
		type: SET_ERRORS, 
		payload: err && err.response && err.response.data ? err.response.data : {}
	};
};