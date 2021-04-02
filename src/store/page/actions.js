import {
    PAGE_LOADING,
	PAGE_LOADED
} from './types';   

export const setPageLoading = () => {
	return {
		type: PAGE_LOADING
	};
};

export const clearPageLoading = () => {
	return {
		type: PAGE_LOADED
	};
};

