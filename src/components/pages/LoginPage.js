import React, { Component } from 'react';

// Actions
import { connect } from 'react-redux';
import * as ApiServiceActionCreators from '../../redux/actions/apiService';
import * as AuthorizationActionCreators from '../../redux/actions/authorization';
import { bindActionCreators } from 'redux';

// Mui components
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';

// Firebase
import { appFire, facebookProvider } from '../Firebase';

// Contsants
import { SUB_PATH } from '../../constants';

// Routing
import { Redirect } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
		super(props);
        
        this.state = {
            open: false,
            vertical: null,
            horizontal: null,

            redirect: false,
        }
    }

    apiAuth = (provider) => {
        const { AuthorizationActionCreators: { userLoginAction }, 
                ApiServiceActionCreators: { createUserAction, getAllUsersAction} 
              } = this.props;

        getAllUsersAction();
        let userId;

        appFire.auth().signInWithPopup(provider)
            .then((result, error) => {
                if (error) {
                    // alert(1);
                    // this.handleClick({ vertical: 'bottom', horizontal: 'center' });
                } else {
                    const { users: { dataUsers } } = this.props;
                    
                    console.log('dataUser', dataUsers);
                    
                    for (let prop in dataUsers) {
                        if (dataUsers[prop]["email"] === result.user.email) {
                            userId = prop;
                        }
                    }

                    if (userId) {
                        // Login
                        // console.log('user exists', userId);
                        userLoginAction({ userId: userId, data: result.user});

                        // this.setState({
                        //     redirect: true
                        // })  
                    }

                    else {
                        // Create and login
                        // console.log('user has been created');
                        createUserAction(result.user);
                        userLoginAction({ userId: userId, data: result.user});
                        //getAllUsersAction();
                        
                        // this.setState({
                        //     redirect: true
                        // })  
                    }
                }
            })
            .catch(error => {
                console.log('signInWithPopup(provider)', error);
            })
    }

    // FACEBOOK
    authWithFacebook = () => {
        this.apiAuth(facebookProvider);
    }

    handleClick = state => () => {
        this.setState({ open: true, ...state });
      };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { vertical, horizontal, open } = this.state;

        if (this.props.authorization.authenticated) {
            return <Redirect to={`${SUB_PATH}/`} />
        }

        return(
            <div className="login-page">
                <h1>
                    Welcome to <br/> <strong>Fuel Manager</strong>
                </h1>

                <div className="login-divider"></div>
                
                <Button color="primary" 
                        variant="raised"
                        size="large"
                        onClick={() => { this.authWithFacebook() }}>
                    Login with Facebook
                </Button>
                {/* 
                <br/>

                <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'center' })}>
                    Bottom-Center
                </Button> */}

                {/* <br/>

                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Please check Login or Password</span>}
                /> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
	return {
        authorization: state.authorizationState,
        users: state.usersState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
        ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch),
		AuthorizationActionCreators: bindActionCreators(AuthorizationActionCreators, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);