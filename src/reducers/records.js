import {
    GET_ALL_RECORDS,
    RECORDS_FAIL,
    CREATE_RECORD,
} from '../constants';

const initialState = {
    error: {},
    dataRecords: {}
}

function records(state = initialState, action) {
    switch (action.type) {
        // FAIL
        case RECORDS_FAIL :
            return {
                ...state,
                error: {
                    isError: action.isError,
                    request: 'Network error: ' + action.request
                }
            }

        // CREATE_RECORD
        case CREATE_RECORD :
            const id = action.payload["name"];
            const data = action.props;
                        
            return {
                ...state,
                dataRecords: {...state.dataRecords, [id]: data}
            };

        // GET_ALL_RECORDS
        case GET_ALL_RECORDS :
            return {
                ...state, 
                dataRecords: action.payload
            };

        default:
            return state;
    }
}

export default records;