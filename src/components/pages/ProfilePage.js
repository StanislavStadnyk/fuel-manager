import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ApiServiceActionCreators from '../../redux/actions/apiService';
import { bindActionCreators } from 'redux';

class ProfilePage extends Component {
	render() {
		return (
            <div className="container">
                Profile PAGE              
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notices: state.noticesState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
