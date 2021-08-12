import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import account_reducer from './account'
import ipaddress_reducer from './ipaddress'
import common_reducer from './common'

const allReducers = combineReducers({
	session: sessionReducer,
	account: account_reducer,
	ipaddress: ipaddress_reducer,
	common: common_reducer,
});

export default allReducers;