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
import Grid from '@material-ui/core/Grid';

// Firebase
import { appFire } from './base';

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true
		}
	}
	
	// componentDidMount = () => {
	// 	const { ApiServiceActionCreators: {
	// 				getAllDirectoriesAction,
	// 				getAllNoticesAction
	// 			}, 
	// 			DirectoriesActionCreators: {
	// 				selectedDirectoryAction
	// 			}, 
	// 		    params
	// 		  } = this.props;

	// 	getAllDirectoriesAction();
	// 	getAllNoticesAction();
	// }

	componentWillMount = () => {
		console.log('App componentWillMount', this.props)

		const { AuthorizationActionCreators: { userLoginAction, userLogoutAction },
				ApiServiceActionCreators: { getAllUsersAction},
			  } = this.props;

		getAllUsersAction();

		this.removeAuthListener = appFire.auth().onAuthStateChanged((user) => {
			let userId;
			const { users: { dataUsers } } = this.props;
                    
			console.log('dataUser removeAuthListener', dataUsers);
			console.log('removeAuthListener', user)
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

	render() {
		//const { directories } = this.props;
		console.log('App render', this.props);

		const { authorization: { authenticated }} = this.props;

		if (this.state.loading) {
			return <Spinner />
		}
		
		return (
			<ConnectedRouter history={this.props.history}>
				<div>
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
