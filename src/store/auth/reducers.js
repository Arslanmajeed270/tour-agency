import { 
	SET_CURRENT_AGENCY,
	CLEAR_CURRENT_AGENCY
 } from './types';

const initialState = {
	isAuthenticated: false,
	agency: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_AGENCY:
			return {
				...state,
				isAuthenticated: true,
				agency: action.payload
			};
		case CLEAR_CURRENT_AGENCY:
			return {
				...state,
				isAuthenticated: false,
				agency: {}
			};

		default:
			return state;
	}
}