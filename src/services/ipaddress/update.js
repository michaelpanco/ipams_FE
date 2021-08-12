import axios from 'axios';
import api from '../../config/api.routes';
import { getCookie } from './../../utils/Cookie'

import { ALERT_SUCCESS, ALERT_FAILED, UPDATE_IPADDRESS_REQUEST, UPDATE_IPADDRESS_SUCCESS, UPDATE_IPADDRESS_FAILED } from './../../constant'

const request_update = () => ({
    type: UPDATE_IPADDRESS_REQUEST,
    succeeded: false,
    requesting: true,
    completed: false,
});

const successful_update = () => ({
    type: UPDATE_IPADDRESS_SUCCESS,
    success: true,
    requesting: false,
    completed: true,
});

const failed_update = (message) => ({
    type: UPDATE_IPADDRESS_FAILED,
    succeeded: false,
    requesting: false,
    completed: true,
    message: message
});

const notify_success = () => ({
    type: ALERT_SUCCESS,
    submitted: true,
    status: 'success',
    message: 'IP Address has been updated successfuly',
});

const notify_failed = (message) => ({
    type: ALERT_FAILED,
    submitted: true,
    status: 'failed',
    message: message,
});


export const update = (user_input) => (

    (dispatch) => {

        dispatch(request_update());

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('token')
        }

        axios.patch(api().UPDATEIPADDRESSDETAILS, {

            id: user_input.ipaddressid,
            ip: user_input.ipaddress,
            label: user_input.iplabel

        }, {headers : headers})
        .then((res) => {

            if(!res.data.success){
                dispatch(failed_update())
                dispatch(notify_failed(res.data.error))
            }else{
                dispatch(successful_update())
                dispatch(notify_success())
            }

        }).catch((err) => {

            if (err.response) {
                // Response Err
                dispatch(failed_update(err.response.data.error))
             } else {
                // Normal Err
                dispatch(failed_update(err))
             }
        })
    }
);