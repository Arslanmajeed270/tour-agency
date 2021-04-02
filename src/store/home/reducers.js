import { 
	SET_HOME_PAGE_DATA,
	SET_CITIES_DATA
 } from './types';

const initialState = {
	homePageData: {},
	cities: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_HOME_PAGE_DATA:
			return {
				...state,
				homePageData: action.payload
			};
		case SET_CITIES_DATA:
			return {
				...state,
				cities: action.payload
			};
		default:
			return state;
	}
}