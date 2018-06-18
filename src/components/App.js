import React, { Component } from 'react';

// Actions
import { connect } from 'react-redux';
import * as ApiServiceActionCreators from '../redux/actions/apiService';
import * as AuthorizationActionCreators from '../redux/actions/authorization';

import * as DirectoriesActionCreators from '../redux/actions/directories';
import * as NoticesActionCreators from '../redux/actions/notices';
import { bindActionCreators } from 'redux';

// Routing
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

// Components
import Header from './Header';
import Spinner from './Spinner';

// Mui
import Snackbar from '@material-ui/core/Snackbar';

// Pages
import { HomePage, 
		 LoginPage, 
		 LogoutPage, 
		 ProfilePage, 
		 StationsPage, 
		 Error404 } from '../components/pages/index';

// Constants
import { SUB_PATH } from '../constants';

// Layout
import CssBaseline from '@material-ui/core/CssBaseline';

// Firebase
import { appFire } from './Firebase';

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true
		}
	}
	
	componentWillMount = () => {
		// console.log('App componentWillMount', this.props)

		const { AuthorizationActionCreators: { userLoginAction, userLogoutAction },
				ApiServiceActionCreators: { getAllUsersAction},
			  } = this.props;

		getAllUsersAction();
		let userId;

		this.removeAuthListener = appFire.auth().onAuthStateChanged((user) => {
			const { users: { dataUsers } } = this.props;
                    
			// console.log('dataUser removeAuthListener', dataUsers);
			// console.log('removeAuthListener', user)
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
		//const { directories } = this.props;
		console.log('App render', this.props);

		const { authorization: { authenticated }, 
				users: { newUserId }, 
				records 
			  } = this.props;

		if (newUserId) {
			// debugger;
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

function mapStateToProps(state) {
	return {
		records: state.recordsState,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
