import {
    ALERT_CLOSE,
    ALERT_SUCCESS,
    ALERT_FAILED,
} from './../../constant';


const initialState = {
    status: "info",
    submitted: false,
	message: "",
}

function alertNotifReducer(state = initialState, action) {

	if (action.type === ALERT_CLOSE) {
		return Object.assign({}, state, {
            submitted: false,
		});
    }

	if (action.type === ALERT_SUCCESS) {
		return Object.assign({}, state, {
            status: "success",
            submitted: action.submitted,
            message: action.message,
		});
    }
    
	if (action.type === ALERT_FAILED) {
		return Object.assign({}, state, {
            status: "error",
            submitted: action.submitted,
            message: action.message,
		});
    }
    

	return state;
};

export default alertNotifReducer;