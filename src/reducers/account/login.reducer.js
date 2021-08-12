import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from './../../constant';

const initialState = {
    requesting: false,
    succeeded: false,
    completed: false,
    message: '',
}

function forgotPasswordReducer(state = initialState, action) {

	if (action.type === LOGIN_REQUEST) {
		return Object.assign({}, state, {
			requesting: true,
            completed: false,
            succeeded: false,
            message: '',
		});
    }

	if (action.type === LOGIN_SUCCESS) {
		return Object.assign({}, state, {
            requesting: false,
			succeeded: true,
            completed: true,
		});
    }
    
	if (action.type === LOGIN_FAILURE) {
		return Object.assign({}, state, {
            requesting: false,
			succeeded: false,
            completed: true,
            message: action.message,
		});
    }

	return state;
};

export default forgotPasswordReducer;