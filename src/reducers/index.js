import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import records from './records';
import users from './users';
import authorization from './authorization';

import notices from './notices';
import directories from './directories';

export default combineReducers({
	routing: routerReducer,
	recordsState: records,
	usersState: users,
	authorizationState: authorization,

	directoriesState: directories,
	noticesState: notices,
});