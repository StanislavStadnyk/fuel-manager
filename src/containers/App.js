import React, { Component } from 'react';

// Actions
import { connect } from 'react-redux';
import * as ApiServiceActionCreators from '../redux/actions/apiService';
import * as AuthorizationActionCreators from '../redux/actions/authorization';

import { bindActionCreators } from 'redux';

// Routing
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

// Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';

// Mui components
// import Snackbar from '@material-ui/core/Snackbar';

// Routers
import { HomePage, 
		 LoginPage, 
		 LogoutPage, 
		 ProfilePage, 
		 StationsPage, 
		 Error404 } from '../routes/index';

// Constants
import { SUB_PATH } from '../constants';

// Layout
import CssBaseline from '@material-ui/core/CssBaseline';

// Firebase
import { appFire } from '../firebase';

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true
		}
	}
	
	componentWillMount = () => {
		const { AuthorizationActionCreators: { userLoginAction, userLogoutAction },
				ApiServiceActionCreators: { getAllUsersAction},
			  } = this.props;

		getAllUsersAction();
		let userId;

		this.removeAuthListener = appFire.auth().onAuthStateChanged((user) => {
			const { users: { dataUsers } } = this.props;
                    
			if (user) {
				for (let prop in dataUsers) {
					if (dataUsers[prop]["email"] === user.email) {
						userId = prop;
					}
				}

				userLoginAction({ userId: userId, data: user});

				this.setState({
					loading: false
				})
			} else {
				userLogoutAction();

				this.setState({
					loading: false
				})
			}
		});
	}

	componentWillUnmount = () => {
		this.removeAuthListener();
	}

	// handleSnackClick = state => () => {
    //     this.setState({ open: true, ...state });
    //   };
    
    // handleSnaclClose = () => {
    //     this.setState({ open: false });
    // };

	render() {
		console.log('App render', this.props);

		const { authorization: { authenticated }, 
				users: { newUserId }, 
			  } = this.props;

		if (newUserId) {
			window.location.reload();
		}

		if (this.state.loading) {
			return <Spinner />
		}
		
		return (
			<ConnectedRouter history={this.props.history}>
				<div className="app-wrapper">
					<CssBaseline />
					<Header auth={ authenticated }/>

					<Switch>
						<Route path={`${SUB_PATH}/login`} component={LoginPage}/>
						<Route path={`${SUB_PATH}/logout`} component={LogoutPage}/>
						
						<PrivateRoute exact 
									  auth={ authenticated } 
									  path={`${SUB_PATH}/`} 
									  component={HomePage} />
						<PrivateRoute auth={ authenticated } 
									  path={`${SUB_PATH}/profile`} 
									  component={ProfilePage} />
						<PrivateRoute auth={ authenticated } 
									  path={`${SUB_PATH}/stations`} 
									  component={StationsPage} />
						<PrivateRoute auth={ authenticated } 
									  path="*" 
									  component={Error404}/>
					</Switch>

					{/* {
						records.error.isError
							? <AppBar position="static" 
									style={{ padding: 20, marginBottom: 20 }}>
								<h4>{records.error.request}</h4>
							</AppBar>
							: null
					}

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
		    </ConnectedRouter>
		);
	}
}

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return(<Route
		{...rest}
		render={props =>  
			auth
				? <Component {...props} />
				: <Redirect to={`${SUB_PATH}/login`} />
		}
	/>
)};

function mapStateToProps(state) {
	return {
		users: state.usersState,
		authorization: state.authorizationState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch),
		AuthorizationActionCreators: bindActionCreators(AuthorizationActionCreators, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
