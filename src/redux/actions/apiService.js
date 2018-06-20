import axios from 'axios';
import {
	GET_ALL_RECORDS,
	RECORDS_FAIL,
	CREATE_RECORD,
	DELETE_RECORD,
	UPDATE_RECORD,

	CREATE_USER,
	USER_FAIL,
	GET_ALL_USERS,


	GET_ALL_DIRECTORIES,
	CREATE_DIRECTORY,
	UPDATE_DIRECTORY,
	DELETE_DIRECTORY,
	GET_ALL_NOTICES,
	CREATE_NOTICE,
	UPDATE_NOTICE,
	DELETE_NOTICE,
	DND_NOTICES,
	BACK_END_SERVER,
	DIRECTORIES_FAIL,
	NOTICES_FAIL
} from '../../constants';

function ajaxCall(callAPI) {
	return axios({
		method: callAPI.method || 'GET',
		url: callAPI.url,
		data: callAPI.data || '',
		headers: { 'Content-Type': 'application/json'}
	});
  }
  
function defaultAjaxCall(dispatch, type, type_fail, callAPI, props) {
	const successHandler = response => {
		dispatch({
			type: type,
			payload: response.data,
			props: props
		})
	}

	const errorHandler = error => {
		dispatch({
			type: type_fail, 
			isError: true,
			request: type
		})
	}

	ajaxCall(callAPI)
		.then(response => successHandler(response))
		.catch(error => errorHandler(error))
}

// ------------- Records -------------
// get all records from server
export const getAllUsersAction = () => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						GET_ALL_USERS, 
						USER_FAIL, 
						{
							url: `${BACK_END_SERVER}/users.json`
						});
	}
}

// get all records from server
export const getAllRecordsAction = (userId) => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						GET_ALL_RECORDS, 
						RECORDS_FAIL, 
						{
							url: `${BACK_END_SERVER}/users/${userId}/records.json`
						});
	}
}

// create record on server
export const createRecordAction = (props) => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						CREATE_RECORD, 
						RECORDS_FAIL, 
						{	
							method: 'POST',
							url: `${BACK_END_SERVER}/users/${props.userId}/records.json`,
							data: {
								date: props.date,
								odometer: props.odometer,
								volume: props.volume,
								type: props.type,
								cost: props.cost
							}
						},
						props);
	}
}

// create record on server
export const createUserAction = (props) => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						CREATE_USER, 
						USER_FAIL, 
						{	
							method: 'POST',
							url: `${BACK_END_SERVER}/users.json`,
							data: {
								name: props.displayName,
								email: props.email,
							}
						},
						props);
	}
}

// delete record on server
export const deleteRecordAction = (props) => {
	// console.log('deleteRecordAction', props)
	return function(dispatch) {
		axios.delete(`${BACK_END_SERVER}/users/${props.userId}/records/${props.record.id}.json`)
			.then(function () {
				dispatch(getAllRecordsAction(props.userId));
			})
			.catch(function () {
				dispatch({
					type: RECORDS_FAIL, 
					isError: true,
					request: DELETE_RECORD
				});
			});
	}
}
export const refreshDeleteAction = () => {
	return {
		type: RECORDS_FAIL,
		isError: false,
	}
}

// update record on server
export const updateRecordAction = (props) => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						UPDATE_RECORD, 
						RECORDS_FAIL, 
						{	
							method: 'PUT',
							url: `${BACK_END_SERVER}/users/${props.userId}/records/${props.recordId}.json`,
							data: {
								date: props.date,
								odometer: props.odometer,
								volume: props.volume,
								type: props.type,
								cost: props.cost
							}
						});
	}
}




















// ------------- Directories -------------
// get all directories from server
export const getAllDirectoriesAction = () => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						GET_ALL_DIRECTORIES, 
						DIRECTORIES_FAIL, 
						{
							//url: `${BACK_END_SERVER}/directories`
						});
	}
}

// create directory on server
export const createDirectoryAction = (props) => {
	return function(dispatch) {
		const parentId = (props.parentId === undefined) ? 1 : props.parentId;

		defaultAjaxCall(dispatch, 
						CREATE_DIRECTORY, 
						DIRECTORIES_FAIL, 
						{	
							method: 'POST',
							url: `${BACK_END_SERVER}/directories`,
							data: {
								parentId: parentId,
								name: props.name
							}
						});

	}
}

// delete directory on server
export const deleteDirectoryAction = (props) => {
	return function(dispatch) {
		axios.delete(`${BACK_END_SERVER}/directories/${props.id}`)
			.then(function (response) {
				dispatch(getAllDirectoriesAction());
			})
			.catch(function (error) {
				dispatch({
					type: DIRECTORIES_FAIL, 
					isError: true,
					request: DELETE_DIRECTORY
				});
			});
	}
}

// update directory on server
export const updateDirectoryAction = (props) => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						UPDATE_DIRECTORY, 
						DIRECTORIES_FAIL, 
						{	
							method: 'PUT',
							url: `${BACK_END_SERVER}/directories/${props.id}`,
							data: {
								parentId: props.parentId,
								id: props.id,
								name: props.name
							}
						});
	}
}


// ------------- Notices -------------
// get all notices for selected directory
export const getAllNoticesAction = () => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						GET_ALL_NOTICES, 
						NOTICES_FAIL, 
						{	
							//url: `${BACK_END_SERVER}/notices`
						});
	}
}

// create notice on server
export const createNoticeAction = (props) => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						CREATE_NOTICE, 
						NOTICES_FAIL, 
						{	
							method: 'POST',
							url: `${BACK_END_SERVER}/notices`,
							data: {
								directoryId: props.directoryId,
								title: props.title,
								description: props.description,
								tags: props.tags
							}
						});
	}
}

// update notice on server
export const updateNoticeAction = (props) => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						UPDATE_NOTICE, 
						NOTICES_FAIL, 
						{	
							method: 'PUT',
							url: `${BACK_END_SERVER}/notices/${props.id}`,
							data: {
								id: props.id,
								directoryId: props.directoryId,
								title: props.title,
								tags: props.tags,
								description: props.description,
								position: props.position
							}
						});
	}
}

// delete notice on server
export const deleteNoticeAction = (id) => {
	return function(dispatch) {
		defaultAjaxCall(dispatch, 
						DELETE_NOTICE, 
						NOTICES_FAIL, 
						{	
							method: 'DELETE',
							url: `${BACK_END_SERVER}/notices/${id}`
						});
	}
}

// DnD Server side
export const dndNoticesActionServer = (props) => {
	return function(dispatch) {
		let promises = [];
		let notices = props.notices;
		
		for (let i = 0; i < notices.length; i++) {
			promises.push(axios.put(`${BACK_END_SERVER}/notices/${notices[i].id}`, {
				id: notices[i].id,
				directoryId: notices[i].directoryId,
				title: notices[i].title,
				tags: notices[i].tags,
				description: notices[i].description,
				position: notices[i].position
			}));
		}
		
		axios.all(promises)
			 .then(function(results) {
				dispatch({type: DND_NOTICES});
			 })
			 .catch(function (error) {
				dispatch({
					type: NOTICES_FAIL, 
					isError: true,
					request: DND_NOTICES
				});
			 });
	}
}