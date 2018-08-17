import React, { Component } from 'react';

// Actions
import { connect } from 'react-redux';
import * as AuthorizationActionCreators from '../redux/actions/authorization';
import { bindActionCreators } from 'redux';

// Firebase
import { appFire } from '../firebase';

// Constants
import { SUB_PATH } from '../constants';

// Routing
import { Redirect } from 'react-router-dom';

// Custom components 
import Spinner from '../components/Spinner';

class LogoutPage extends Component {
    componentWillMount = () => {
        const { AuthorizationActionCreators: { userLogoutAction }} = this.props;

        appFire.auth().signOut()
            .then(() => {
                userLogoutAction();
            });
    }

    render() {
        const { authorization: { authenticated }} = this.props;

        if (!authenticated) {
            return <Redirect to={`${SUB_PATH}/login`} />
        } 

        return (
            <Spinner />
        )
    }
}

function mapStateToProps(state) {
	return {
		authorization: state.authorizationState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		AuthorizationActionCreators: bindActionCreators(AuthorizationActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);