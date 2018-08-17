import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import records from './records';
import users from './users';
import authorization from './authorization';

export default combineReducers({
	routing: routerReducer,
	recordsState: records,
	usersState: users,
	authorizationState: authorization,
});