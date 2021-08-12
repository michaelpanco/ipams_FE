import axios from 'axios';
import api from '../../config/api.routes';
import { getCookie } from './../../utils/Cookie'

import { ALERT_SUCCESS, ALERT_FAILED, CREATE_IPADDRESS_REQUEST, CREATE_IPADDRESS_SUCCESS, CREATE_IPADDRESS_FAILED } from './../../constant'

const request_create = () => ({
    type: CREATE_IPADDRESS_REQUEST,
    succeeded: false,
    requesting: true,
    completed: false,
});

const successful_create = () => ({
    type: CREATE_IPADDRESS_SUCCESS,
    success: true,
    completed: true,
});

const failed_create = (message) => ({
    type: CREATE_IPADDRESS_FAILED,
    succeeded: false,
    requesting: false,
    completed: true,
    message: message
});

const notify_success = () => ({
    type: ALERT_SUCCESS,
    submitted: true,
    status: 'success',
    message: 'IP Address has been added successfuly',
});

const notify_failed = (message) => ({
    type: ALERT_FAILED,
    submitted: true,
    status: 'failed',
    message: message,
});


export const create = (user_input) => (

    (dispatch) => {

            dispatch(request_create());

            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('token')
            }

            axios.post(api().CREATEIPADDRESSDETAILS, {

                ip: user_input.ipaddress,
                label: user_input.iplabel
    
            }, {headers : headers})
            .then((res) => {
    
                if(!res.data.success){
                    dispatch(failed_create())
                    dispatch(notify_failed(res.data.error))
                    return;
                }
    
                dispatch(successful_create())
                dispatch(notify_success())
    
                setTimeout(function () {
                    window.location.href = "/ipaddress/" + res.data.details.id;
                }, 1000)
    
    
            }).catch((err) => {
    
                if (err && err.response) {
                    // Response Err
                    dispatch(failed_create(err.response.data.error))
                    dispatch(notify_failed(err.response.data.error))
                    
                 } else {
                    // Normal Err
                    dispatch(notify_failed(err))
                 }
            })




    }
);