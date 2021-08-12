import {
    UPDATE_IPADDRESS_EDIT,
    UPDATE_IPADDRESS_REQUEST,
    UPDATE_IPADDRESS_CANCEL,
    UPDATE_IPADDRESS_FAILED,
    UPDATE_IPADDRESS_SUCCESS
} from './../../constant';

const initialState = {
    edit: false,
    requesting: false,
    succeeded: false,
    completed: false,
    message: '',
}

function forgotPasswordReducer(state = initialState, action) {

	if (action.type === UPDATE_IPADDRESS_EDIT) {
		return Object.assign({}, state, {
			edit: true,
		});
    }

	if (action.type === UPDATE_IPADDRESS_REQUEST) {
		return Object.assign({}, state, {
            requesting: true,
		});
    }
    
	if (action.type === UPDATE_IPADDRESS_CANCEL) {
		return Object.assign({}, state, {
            edit: false
		});
    }

	if (action.type === UPDATE_IPADDRESS_SUCCESS) {
		return Object.assign({}, state, {
            requesting: false,
            succeeded: true,
            completed: true,
            edit: false
		});
    }

	if (action.type === UPDATE_IPADDRESS_FAILED) {
		return Object.assign({}, state, {
            requesting: false,
            succeeded: false,
            completed: true,
		});
    }


	return state;
};

export default forgotPasswordReducer;