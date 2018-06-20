import {
    GET_ALL_RECORDS,
    RECORDS_FAIL,
    CREATE_RECORD,
    UPDATE_RECORD
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

        // UPDATE_RECORD
        // case UPDATE_RECORD :
        //     console.log('UPDATE_RECORD', action);
        //     let index = state.dataRecords.findIndex(i => i.id === action.payload.id);
        // return {
        //     ...state,
        //     data: [...state.data.slice(0, index), action.payload, ...state.data.slice(index + 1)],
        //     selectedDirectory: +action.payload.id
        // };

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