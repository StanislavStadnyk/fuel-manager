import {
	USER_LOGIN,
	USER_LOGOUT
} from '../../constants';

// UserLoginAction
export const userLoginAction = (props) => {
    console.log('userLoginAction', props);
    return {
        type: USER_LOGIN,
        authenticated: true,
        userId: props.userId,
        userEmail: props.data.email
    }
}

// UserLogoutAction
export const userLogoutAction = () => {
	return {
        type: USER_LOGOUT,
        authenticated: false,
        userId: null,
        userEmail: null
	}
}