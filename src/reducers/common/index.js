import { combineReducers } from 'redux';
import notify from './alert.reducer'

const notifyReducer = combineReducers({
	notify: notify,
});

export default notifyReducer;