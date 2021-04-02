import axios from 'axios';

import {
    setPageLoading,
    clearPageLoading,
} from '../page/actions';

import {
    setErrors,
    clearErrors
} from '../errors/actions';
import { Success } from '../../components/common/toastify';

const BACKEND_SERVER_URL = process.env.REACT_APP_API_URL_DEV || "/";

// Contact Us
export const contactUs = ( reqPacket ) => dispatch => {
    dispatch(setPageLoading());

    axios
    .post(
        BACKEND_SERVER_URL+'/contactUs',
        reqPacket
    )
    .then(res => {
        const { status } = res.data;
        if( status === "success" ){
            Success('Successfully submited!')
            dispatch(clearErrors());
        }else{
            dispatch(setErrors({
                message: "SomeThing Went Wrong! Please try again."
            }))
        }        
    })
    .catch(err => dispatch(setErrors(err)))
    .finally(() => dispatch(clearPageLoading()))
};