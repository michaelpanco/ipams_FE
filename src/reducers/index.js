import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import account_reducer from './account'

const allReducers = combineReducers({
	session: sessionReducer,
	account: account_reducer,
});

export default allReducers;