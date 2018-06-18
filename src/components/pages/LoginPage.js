import React, { Component } from 'react';
import firebase from 'firebase';

// Actions
import { connect } from 'react-redux';
import * as ApiServiceActionCreators from '../../redux/actions/apiService';
import * as AuthorizationActionCreators from '../../redux/actions/authorization';
import { bindActionCreators } from 'redux';

// Mui
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';

// Firebase
import { appFire, facebookProvider, googleProvider } from '../Firebase';

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
                // console.log('signInWithPopup(provider)', error);

                //let credential = appFire.auth.GoogleAuthProvidercredential(
                //    googleUser.getAuthResponse().id_token);
      

                const email = error.email;
                appFire.auth().fetchSignInMethodsForEmail(email)
                    .then(() => {
                        //console.log('fetchProvidersForEmail', providers)
                        //console.log('googleProvider', googleProvider)

                        // appFire.auth().signInWithPopup(googleProvider)
                        //     .catch(error => {
                        //         console.log('pendingCredCred', error)
                        //     }
                        // )
                        
                        //googleProvider.addScope('profile');
                        //googleProvider.addScope('email');
                        appFire.auth().signInWithRedirect(googleProvider)
                        // this.setState({
                        //     redirect: true
                        // }) 
                        // appFire.auth().getRedirectResult().then(function(result) {
                        //         // console.log(result);
                        //         //alert(result);
                        //         if (result.credential) {
                        //             //debugger;
                        //            // This gives you a Google Access Token.
                        //            <Redirect to={`${SUB_PATH}/`} />
                                   
                                
                        //         }
                                
                        //      })
                        
                        

                        // appFire.auth().signInWithRedirect(googleProvider);
                        // appFire.auth().getRedirectResult().then(function(result) {
                        //     if (result.credential) {
                        //       // This gives you a Google Access Token. You can use it to access the Google API.
                        //       var token = result.credential.accessToken;
                        //       console.log(result)
                        //     }
                        //     // The signed-in user info.
                        //   })

                        //    appFire.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(token))
                        //     .then(user => {
                        //         debugger;
                        //         // You can now link the pending credential from the first
                        //         // error.
                        //         user.linkWithCredential(error.credential)
                        //     })
                        
                    })
                
            })
    }

    // GOOGLE
    authWithGoogle = () => {
        this.apiAuth(googleProvider);
    }

    // FACEBOOK
    authWithFacebook = () => {
        this.apiAuth(facebookProvider);
    }

    // authWithEmailPassword = (event) => {
    //     event.preventDefault();
    //     console.log('authWithEmailPassword');
    //     console.table([{
    //         email: this.emailInput.value,
    //         password: this.passwordlInput.value
    //     }])
    // }

    handleClick = state => () => {
        this.setState({ open: true, ...state });
      };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { vertical, horizontal, open } = this.state;
        // console.log('LoginPageProps', this.props)

        if (this.props.authorization.authenticated) {
            return <Redirect to={`${SUB_PATH}/`} />
        }

        return(
            <div>
                <Button color="primary" 
                        variant="outlined"
                        onClick={() => { this.authWithFacebook() }}>
                    Login with Facebook
                </Button>
                {/* <Button color="secondary"
                        variant="outlined"
                        onClick={() => { this.authWithGoogle() }}>
                    Login with Google
                </Button> */}
                <Divider/>
                {/* <form onSubmit={(event) => { this.authWithEmailPassword(event)}}
                      ref={(form) => { this.loginForm = form }}>

                        <h5>Note</h5>
                        If you don't have facebook account

                        <FormControl>
                            <InputLabel htmlFor="label-login-email">Email:</InputLabel>
                            <input id="label-login-email"
                                   type="email"
                                   ref={(input) => { this.emailInput = input}}/>
                        </FormControl>

                        <br/>

                        <FormControl>
                            <InputLabel htmlFor="label-login-password">Password:</InputLabel>
                            <input id="label-login-password"
                                   type="password"
                                   ref={(input) => { this.passwordlInput = input}}/>
                        </FormControl>

                        <input type="submit" value="Log in"/>
                </form>

                <br/>

                <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'center' })}>
                    Bottom-Center
                </Button> */}

                <br/>

                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Please check Login or Password</span>}
                />
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