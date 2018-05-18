import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import records from './records';
import notices from './notices';
import directories from './directories';

export default combineReducers({
	routing: routerReducer,
	directoriesState: directories,
	noticesState: notices,
	recordsState: records,
});