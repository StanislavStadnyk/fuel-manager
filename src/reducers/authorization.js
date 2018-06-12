import {
    USER_LOGIN,
    USER_LOGOUT
} from '../constants';

const initialState = {
    userId: null,
    userEmail: null,
    authenticated: false
}

function authorization(state = initialState, action) {
    switch (action.type) {
        // USER_LOGIN
        case USER_LOGIN :
            return {
                ...state, 
                authenticated: action.authenticated,
                userId: action.userId,
                userEmail: action.userEmail
            };

        // USER_LOGIN
        case USER_LOGOUT :
            return {
                ...state, 
                authenticated: action.authenticated,
                userId: action.userId,
                userEmail: action.userEmail
            };

        default:
            return state;
    }
}

export default authorization;