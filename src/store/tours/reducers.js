import { 
	SET_AGENCY_TOURS_DATA,
 } from './types';

const initialState = {
	toursData: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_AGENCY_TOURS_DATA:
			return {
				...state,
				toursData: action.payload
			};
		default:
			return state;
	}
}