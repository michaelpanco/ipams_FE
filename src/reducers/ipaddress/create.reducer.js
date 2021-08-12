import {
    CREATE_IPADDRESS_NEW,
    CREATE_IPADDRESS_CLOSE,
    CREATE_IPADDRESS_REQUEST,
    CREATE_IPADDRESS_FAILED,
    CREATE_IPADDRESS_SUCCESS
} from './../../constant';

const initialState = {
    new: false,
    requesting: false,
    succeeded: false,
    completed: false,
    message: '',
}

function forgotPasswordReducer(state = initialState, action) {

	if (action.type === CREATE_IPADDRESS_NEW) {
		return Object.assign({}, state, {
			new: true,
		});
    }
	if (action.type === CREATE_IPADDRESS_CLOSE) {
		return Object.assign({}, state, {
			new: false,
		});
    }

	if (action.type === CREATE_IPADDRESS_REQUEST) {
		return Object.assign({}, state, {
			requesting: true,
            completed: false,
            succeeded: false,
            message: '',
		});
    }

	if (action.type === CREATE_IPADDRESS_SUCCESS) {
		return Object.assign({}, state, {
			succeeded: true,
            completed: true,
		});
    }
    
	if (action.type === CREATE_IPADDRESS_FAILED) {
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