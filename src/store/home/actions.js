import axios from 'axios';

import {
    SET_HOME_PAGE_DATA,
    SET_CITIES_DATA
} from './types';

import {
    setPageLoading,
    clearPageLoading,
} from '../page/actions';

import {
    setErrors,
    clearErrors
} from '../errors/actions';

const BACKEND_SERVER_URL = process.env.REACT_APP_API_URL_DEV || "/";

// HomepageDate - Get homePageDate from backend
export const getHomePageData = ( history ) => dispatch => {
    dispatch(setPageLoading());

    axios
    .get(
        BACKEND_SERVER_URL+'/home'
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch({
                type: SET_HOME_PAGE_DATA,
                payload: data
            });
            dispatch(clearErrors());
            setTimeout(()=> {
                history.push(`/tours-details`);
            }, 500);

        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong! Please try again."
            }))
        }        
    })
    .catch(err => dispatch(setErrors(err)))
    .finally(() => dispatch(clearPageLoading()))
};

// Cities - Get cities from backend
export const getCities = () => dispatch => {
    dispatch(setPageLoading());

    axios
    .get(
        'apis/cities'
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch({
                type: SET_CITIES_DATA,
                payload: data.cities
            });
            dispatch(clearErrors())
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong! Please try again."
            }))
        }        
    })
    .catch(err => dispatch(setErrors(err)))
    .finally(() => dispatch(clearPageLoading()))
};