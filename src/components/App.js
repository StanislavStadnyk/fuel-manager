import React, { Component } from 'react';
// import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as DirectoriesActionCreators from '../redux/actions/directories';
import * as NoticesActionCreators from '../redux/actions/notices';
import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

// import { ModalAddDirectory, ModalAddNotice } from './modals/index';

//import { Switch, Route, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
// import StationsPage from './pages/StationsPage';
import Header from './Header';

class App extends Component {
	
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

	render() {
		//const { directories } = this.props;
		console.log('App', this.props);
		

		return (
			<div className="container">
				<Header/>

				{/* childs */}
				{this.props.children}
		    </div>
		);
	}
}

function mapStateToProps(state) {
  return {
	records: state.recordsState,
    directories: state.directoriesState,
    notices: state.noticesState
  };
}

function mapDispatchToProps(dispatch) {
	return {
		DirectoriesActionCreators: bindActionCreators(DirectoriesActionCreators, dispatch),
		NoticesActionCreators: bindActionCreators(NoticesActionCreators, dispatch),
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
