import axios from 'axios'
import {
  GET_ALL_RECORDS,
  RECORDS_FAIL,
  CREATE_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,

  CREATE_USER,
  USER_FAIL,
  GET_ALL_USERS,

  BACK_END_SERVER
} from '../../constants'

function ajaxCall (callAPI) {
  return axios({
    method: callAPI.method || 'GET',
    url: callAPI.url,
    data: callAPI.data || '',
    headers: { 'Content-Type': 'application/json' }
  })
}

function defaultAjaxCall (dispatch, type, typeFail, callAPI, props) {
  const successHandler = response => {
    dispatch({
      type: type,
      payload: response.data,
      props: props
    })
  }

  const errorHandler = () => {
    dispatch({
      type: typeFail,
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
  return function (dispatch) {
    defaultAjaxCall(dispatch,
      GET_ALL_USERS,
      USER_FAIL,
      {
        url: `${BACK_END_SERVER}/users.json`
      })
  }
}

// get all records from server
export const getAllRecordsAction = (userId) => {
  return function (dispatch) {
    defaultAjaxCall(dispatch,
      GET_ALL_RECORDS,
      RECORDS_FAIL,
      {
        url: `${BACK_END_SERVER}/users/${userId}/records.json`
      })
  }
}

// create record on server
export const createRecordAction = (props) => {
  return function (dispatch) {
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
      props)
  }
}

// create record on server
export const createUserAction = (props) => {
  return function (dispatch) {
    defaultAjaxCall(dispatch,
      CREATE_USER,
      USER_FAIL,
      {
        method: 'POST',
        url: `${BACK_END_SERVER}/users.json`,
        data: {
          name: props.displayName,
          email: props.email
        }
      },
      props)
  }
}

// delete record on server
export const deleteRecordAction = (props) => {
  // console.log('deleteRecordAction', props)
  return function (dispatch) {
    axios.delete(`${BACK_END_SERVER}/users/${props.userId}/records/${props.record.id}.json`)
      .then(function () {
        dispatch(getAllRecordsAction(props.userId))
      })
      .catch(function () {
        dispatch({
          type: RECORDS_FAIL,
          isError: true,
          request: DELETE_RECORD
        })
      })
  }
}

// refresh delete action
export const refreshDeleteAction = () => {
  return {
    type: RECORDS_FAIL,
    isError: false
  }
}

// update record on server
export const updateRecordAction = (props) => {
  return function (dispatch) {
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
      },
      props.recordId)
  }
}
