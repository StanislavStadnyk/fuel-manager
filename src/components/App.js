import React, { Component } from 'react';
// import { Alert } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';

import * as DirectoriesActionCreators from '../redux/actions/directories';
import * as NoticesActionCreators from '../redux/actions/notices';
import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

import { ModalAddDirectory, ModalAddNotice } from './modals/index';

class App extends Component {
	
	componentDidMount = () => {
		const { ApiServiceActionCreators: {
					getAllDirectoriesAction,
					getAllNoticesAction
				}, 
				DirectoriesActionCreators: {
					selectedDirectoryAction
				}, 
			    params
			  } = this.props;

		getAllDirectoriesAction();
		getAllNoticesAction();
		selectedDirectoryAction(+params.id);
	}

	render() {
		const { directories } = this.props;

		

		return (
			<div className="container">
				{/* Heaader */}
				<h1><Link to="/">Fuel Manager</Link></h1>
				<ul className="nav nav-tabs mb-15">
					<li><Link to="/profile">Profile</Link></li>
					<li><Link to="/stations">Stations</Link></li>
				</ul>


				{/* добавили вывод потомков */}
				{this.props.children}
		    </div>
		);
	}
}

function mapStateToProps(state) {
  return {
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
