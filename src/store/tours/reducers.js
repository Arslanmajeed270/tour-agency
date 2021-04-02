import { 
	SET_TOURS_DATA,
	SET_SINGLE_TOURS,
	SET_USER_BOOKED_TOURS
 } from './types';

const initialState = {
	toursData: {},
	singleTour: {},
	bookedTours: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_TOURS_DATA:
			return {
				...state,
				toursData: action.payload
			};
		case SET_SINGLE_TOURS:
			return {
				...state,
				singleTour: action.payload
			};
		case SET_USER_BOOKED_TOURS:
			return {
				...state,
				bookedTours: action.payload
			};
		default:
			return state;
	}
}