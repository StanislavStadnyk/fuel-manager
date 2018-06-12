import {
    GET_ALL_USERS,
    USER_FAIL,
    CREATE_USER,
} from '../constants';

const initialState = {
    error: {},
    dataUsers: {}
}

function users(state = initialState, action) {
    switch (action.type) {
        // FAIL
        case USER_FAIL :
            return {
                ...state,
                error: {
                    isError: action.isError,
                    request: 'Network error: ' + action.request
                }
            }

        // CREATE_RECORD
        case CREATE_USER :
            return {
                ...state, 
                dataUsers: action.payload
            };

        // GET_ALL_RECORDS
        case GET_ALL_USERS :
            return {
                ...state, 
                dataUsers: action.payload
            };

        default:
            return state;
    }
}

export default users;