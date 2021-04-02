import axios from 'axios';

import {
    SET_CURRENT_AGENCY,
    CLEAR_CURRENT_AGENCY,
} from './types';

import {
    setPageLoading,
    clearPageLoading,
} from '../page/actions';

import {
    setErrors,
    clearErrors
} from '../errors/actions';
import { Success } from '../../components/common/toastify';
import setAuthToken from '../../utils/setAuthToken'


 
const BACKEND_SERVER_URL = process.env.REACT_APP_API_URL_DEV;

// Set logged in agency (Verified)
export const setCurrentAgency = decoded => {
    return {
        type: SET_CURRENT_AGENCY,
        payload: decoded
    };
};

export const clearCurrentAgency = () => {
    return {
		type: CLEAR_CURRENT_AGENCY
	};
};

// Log Agency out (Verified)
export const logoutAgency = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(null);
    dispatch(clearCurrentAgency());
};

// Register
export const register = (reqPacket, history) => dispatch => {
    dispatch(setPageLoading());
    axios
    .post(
        BACKEND_SERVER_URL+'/register',
        reqPacket
    )
    .then(res => {
        const { status } = res.data;
        if( status === "success" ){
            Success("Congratulations! Your account successfully registered.");
            history.push('/login');
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

// Login
export const login = (reqPacket, history) => dispatch => {
    dispatch(setPageLoading());
    axios
    .post(
        BACKEND_SERVER_URL+'/login',
        reqPacket
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch(setCurrentAgency(data.agency))
            setAuthToken(data.jwtToken);
            localStorage.setItem('jwtToken', JSON.stringify(data.jwtToken));
            dispatch(clearErrors())
            history.push(`/dashboard`)
            Success("Successfully logged in!");
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong! Please try again."
            }))
        }        
    })
    .catch(err => dispatch(setErrors(err)))
    .finally(() => dispatch(clearPageLoading()))
};


// update agency info
export const updateAgencyInfo = (reqPacket) => dispatch => {
    dispatch(setPageLoading());
    axios
    .post(
        BACKEND_SERVER_URL+'/updateAgencyInfo',
        reqPacket
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch(setCurrentAgency(data.agency))
            setAuthToken(data.jwtToken);
            localStorage.setItem('jwtToken', JSON.stringify(data.jwtToken));

            dispatch(clearErrors())
            Success("Successfully updated!");
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong! Please try again."
            }))
        }        
    })
    .catch(err => dispatch(setErrors(err)))
    .finally(() => dispatch(clearPageLoading()))
};

// Verify Agency
export const verifyAgency  = (reqPacket) => dispatch => {
    dispatch(setPageLoading());
    axios
    .post(
        BACKEND_SERVER_URL+'/verifyAgency',
        reqPacket
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch(setCurrentAgency(data.agency))
            setAuthToken(data.jwtToken);
            localStorage.setItem('jwtToken', JSON.stringify(data.jwtToken));

            dispatch(clearErrors())
            Success("Email successfully verified!.");
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong! Please try again."
            }))
        }        
    })
    .catch(err => dispatch(setErrors(err)))
    .finally(() => dispatch(clearPageLoading()))
};

// update password 
export const updatePassword   = (reqPacket) => dispatch => {
    dispatch(setPageLoading());
    axios
    .post(
        BACKEND_SERVER_URL+'/updatePassword',
        reqPacket
    )
    .then(res => {
        const { status } = res.data;
        if( status === "success" ){
            dispatch(clearErrors())
            Success("password successfully updated!.");
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong! Please try again."
            }))
        }        
    })
    .catch(err => dispatch(setErrors(err)))
    .finally(() => dispatch(clearPageLoading()))
};

// Get Agency Info
export const getAgency = (id) => dispatch => {
    dispatch(setPageLoading());
    axios
    .get(
        BACKEND_SERVER_URL+'/'+id
    )
    .then(res => {
        const { status, data } = res.data;
        if( status === "success" ){
            dispatch(setCurrentAgency(data.agency))
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
