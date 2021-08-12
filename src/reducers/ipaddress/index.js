import { combineReducers } from 'redux';
import update from './update.reducer'
import create from './create.reducer'

const authReducer = combineReducers({
	update: update,
    create: create,
});

export default authReducer;