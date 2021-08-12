import { combineReducers } from 'redux';
import login from './login.reducer'

const authReducer = combineReducers({
	login: login,
});

export default authReducer;