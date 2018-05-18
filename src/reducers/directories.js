import {
    GET_ALL_DIRECTORIES,
    CREATE_DIRECTORY,
    EDIT_DIR_MODE,
    SELECTED_DIRECTORY,
    UPDATE_DIRECTORY,
    DIRECTORIES_FAIL
} from '../constants';

const initialState = {
    error: {},
    selectedDirectory: null,
    editSelectedDirectory: null,
    data: []
}

function directories(state = initialState, action) {
    switch (action.type) {
        // FAIL
        case DIRECTORIES_FAIL :
            return {
                ...state,
                error: {
                    isError: action.isError,
                    request: 'Network error: ' + action.request
                }
            }

        // EDIT_DIRECTORY_MODE
        case EDIT_DIR_MODE :
            return {
                ...state, 
                editSelectedDirectory: action.id
            };

        // SELECTED_DIRECTORY
        case SELECTED_DIRECTORY :
            return {
                ...state, 
                selectedDirectory: action.id
            };

        // CREATE_DIRECTORY
        case CREATE_DIRECTORY :
            return {
                ...state,
                data: [...state.data, action.payload]
            };

        // UPDATE_DIRECTORY
        case UPDATE_DIRECTORY :
            var index = state.data.findIndex(i => i.id === action.payload.id);

            return {
                ...state,
                data: [...state.data.slice(0,index), action.payload, ...state.data.slice(index+1)],
                selectedDirectory: +action.payload.id
            };

        // GET_ALL_DIRECTORIES
        case GET_ALL_DIRECTORIES :
            return {
                ...state, 
                data: action.payload
            };

        default:
            return state;
    }
}

export default directories;