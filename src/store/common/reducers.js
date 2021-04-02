import { 
	SET_HOME_PAGE_DATA
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
		default:
			return state;
	}
}