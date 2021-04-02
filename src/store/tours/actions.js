import axios from 'axios';

import {
    SET_TOURS_DATA,
    SET_SINGLE_TOURS,
    SET_USER_BOOKED_TOURS
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

// ToursDta - Get ToursData from backend
export const getToursData = (reqPacket) => dispatch => {
    dispatch(setPageLoading());

    axios
    .post(
        BACKEND_SERVER_URL+`/tours`, reqPacket
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch({
                type: SET_TOURS_DATA,
                payload: data
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

// Single Tour - Get single tour from backend
export const getSingleTour = (id) => dispatch => {
    dispatch(setPageLoading());

    axios
    .get(
        BACKEND_SERVER_URL+'/single-tour/'+id
    )
    .then(res => {
        const { status, tour } = res.data;
        if( status === "success" ){
            dispatch({
                type: SET_SINGLE_TOURS,
                payload: tour
            });
            dispatch(clearErrors())
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong! Please try again."
            }))
        }        
    })
    .catch(err => {
        dispatch(setErrors(err)) })
    .finally(() => dispatch(clearPageLoading()))
};

// Book tour - book tour
export const bookTour = (reqPacket) => dispatch => {
    dispatch(setPageLoading());
    axios
    .post(
        BACKEND_SERVER_URL+'/bookTour',
        reqPacket
    )
    .then(res => {
        const { status } = res.data;
        if( status === "success" ){
            Success("Congratulations! Your tour successfully booked.");
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

// user booked tours
export const userBookingDetail = (id) => dispatch => {
    dispatch(setPageLoading());
    console.log(`i am here`);
    axios
    .get(
        BACKEND_SERVER_URL+'/userBookingDetail/'+id
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch({
                type: SET_USER_BOOKED_TOURS,
                payload: data.bookedTours
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