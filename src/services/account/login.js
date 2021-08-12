import axios from 'axios';
import api from '../../config/api.routes';
import {setCookie} from '../../utils/Cookie'
import { sessionService } from 'redux-react-session';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './../../constant'

const request_login = () => ({
    type: LOGIN_REQUEST,
    succeeded: false,
    requesting: true,
    completed: false,
});

const successful_login = () => ({
    type: LOGIN_SUCCESS,
    success: true,
    requesting: false,
    completed: true,
});

const failed_login = (message) => ({
    type: LOGIN_FAILURE,
    succeeded: false,
    requesting: false,
    completed: true,
    message: message
});

export const login = (user_input) => (

    (dispatch) => {

        dispatch(request_login());
        axios.post(api().LOGIN, {
            email: user_input.email,
            password: user_input.password
        })
        .then((res) => {

            if(res.data.success)
            {
                setCookie('token', res.data.token)
                dispatch(successful_login(res.data.token, res.data.account))
                sessionService.saveUser(res.data.account)

            }else{
                throw res.data.message
            }

            setTimeout(function () {
                window.location.href = "/dashboard";
            }, 1000)
            
        }).catch((err) => {

            if (err.response) {
                // Response Err
                dispatch(failed_login(err.response.data.message))
             } else {
                // Normal Err
                dispatch(failed_login(err))
             }
        })
    }
);