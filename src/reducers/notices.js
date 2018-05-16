import {
    SIMPLE_SEARCH,
    ADVANCED_SEARCH,
    CLEAR_TAGS_IN_NOTICE,
    TAGS_IN_NOTICE,
    DND_NOTICES,
    DELETE_NOTICE,
    UPDATE_NOTICE,
    CREATE_NOTICE,
    GET_ALL_NOTICES,
    NOTICES_FAIL
} from '../constants';

const initialState = {
    data: [],
    listOfTagsInNotice: [],
    advancedSearch: false,
    error: {},
}

function notices(state = initialState, action) {
    let index;

    switch (action.type) {
        // FAIL
        case NOTICES_FAIL :
            return {
                ...state,
                error: {
                    isError: action.isError,
                    request: 'Network error: ' + action.request
                }
            }

        // SIMPLE_SEARCH
        case SIMPLE_SEARCH :
            return {
                ...state, 
                advancedSearch: false
            };

        // ADVANCED_SEARCH
        case ADVANCED_SEARCH :
            return {
                ...state, 
                advancedSearch: true
            };

        // CLEAR_TAGS_IN_NOTICE
        case CLEAR_TAGS_IN_NOTICE :
            return {
                ...state, 
                listOfTagsInNotice: []
            };

        // TAGS_IN_NOTICE
        case TAGS_IN_NOTICE :
            return {
                ...state, 
                listOfTagsInNotice: [...state.listOfTagsInNotice, action.payload]
            };

        // DND_NOTICES
        case DND_NOTICES :
            return {
                ...state
            };

        // DELETE_NOTICE
        case DELETE_NOTICE :
            index = state.data.findIndex(i => i.id === action.payload.id);
            return {
                ...state,
                data: [...state.data.slice(0, index), ...state.data.slice(index + 1)]
            };

        // UPDATE_NOTICE
        case UPDATE_NOTICE :
            index = state.data.findIndex(i => i.id === action.payload.id);
            return {
                ...state,
                data: [...state.data.slice(0, index), action.payload, ...state.data.slice(index + 1)],
                selectedDirectory: +action.payload.id
            };

        // CREATE_NOTICE
        case CREATE_NOTICE :
            return {
                ...state,
                data: [...state.data, action.payload]
            };

        // GET_ALL_NOTICES
        case GET_ALL_NOTICES :
            return {
                ...state, 
                data: action.payload
            };

        default:
            return state;
    }
}

export default notices;