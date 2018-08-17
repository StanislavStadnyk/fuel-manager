import {
    GET_ALL_RECORDS,
    RECORDS_FAIL,
    CREATE_RECORD,
    UPDATE_RECORD
} from '../../constants';

const initialState = {
    error: {},
    loading: true,
    dataRecords: {}
}

function records(state = initialState, action) {
    let recordId;
    let newDataRecords = {};
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

        // UPDATE_RECORD
        case UPDATE_RECORD :
            recordId = action.props;
            
            state.dataRecords[recordId] = action.payload;
            newDataRecords = state.dataRecords
        return {
            ...state,
            dataRecords: newDataRecords
        };

        // GET_ALL_RECORDS
        case GET_ALL_RECORDS :
            return {
                ...state, 
                dataRecords: action.payload,
                loading: false
            };

        default:
            return state;
    }
}

export default records;