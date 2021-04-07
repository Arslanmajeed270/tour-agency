import axios from 'axios';

import {
    SET_AGENCY_TOURS_DATA,
} from './types';

import {
    setPageLoading,
    clearPageLoading,
} from '../page/actions';

import {
    setErrors,
    clearErrors
} from '../errors/actions';

import { Success } from '../../components/common/toastify'

const BACKEND_SERVER_URL = process.env.REACT_APP_API_URL_DEV || "/";

// Agency ToursDta - Get Agency ToursData from backend
export const getAgencyToursData = (agencyId) => dispatch => {
    dispatch(setPageLoading());

    axios
    .get(
        BACKEND_SERVER_URL+`/tours/`+agencyId
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch({
                type: SET_AGENCY_TOURS_DATA,
                payload: data
            });
            dispatch(clearErrors())
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong while fetching data."
            }))
        }        
    })
    .catch(err => dispatch(setErrors(err)))
    .finally(() => dispatch(clearPageLoading()))
};

// ADD NEW TOUR
export const addTour = (formData, history) => dispatch => {
    dispatch(setPageLoading());

    axios
    .post(
        BACKEND_SERVER_URL+'/addTour', formData
    )
    .then(res => {
        const { status } = res.data;
        if( status === "success" ){
            Success("Tour successfully added!.");
            dispatch(clearErrors())
            history.push('/list-tours');
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong while adding tour!."
            }))
        }        
    })
    .catch(err => {
        dispatch(setErrors(err)) })
    .finally(() => dispatch(clearPageLoading()))
};


// Edit EXITED TOUR
export const editTour = (formData, history) => dispatch => {
    dispatch(setPageLoading());

    axios
    .post(
        BACKEND_SERVER_URL+'/editTour', formData
    )
    .then(res => {
        const { status } = res.data;
        if( status === "success" ){
            Success("Tour Successfully Updated!.");
            dispatch(clearErrors())
            history.push('/list-tours');
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong while adding tour!."
            }))
        }        
    })
    .catch(err => {
        dispatch(setErrors(err)) })
    .finally(() => dispatch(clearPageLoading()))
};
