import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'react-bootstrap';

import * as ApiServiceActionCreators from '../../redux/actions/apiService';
import { bindActionCreators } from 'redux';

// import * as firebase from 'firebase';

// content
import Records from '../Records';
import { ChartLine } from '../charts/index';

class HomePage extends Component {
	constructor(props, context) {
		super(props, context);
	
		this.handleSelect = this.handleSelect.bind(this);
	
		this.state = {
		  key: 1,
		  data: [],
		  typeInputValue: '',
		  distanceInputValue: ''
		};
	}

	handleSelect(key) {
		this.setState({ key });
	}

	componentDidMount() {
		// const db = firebase.database();
		// const rootRef = db.ref().child('records')

		// rootRef.on('value', snap => {
		// 	this.setState({
		// 		data: snap.val()
		// 	})
		// })
	}

	render() {
		return (
            <div>
                <Tabs
					activeKey={this.state.key}
					onSelect={this.handleSelect}
					id="controlled-tab"
				>
					<Tab eventKey={1} title="Main">
						Main
						<ChartLine/>
					</Tab>
					<Tab eventKey={2} title="Records">
						<Records/>
					</Tab>
				</Tabs>           
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notices: state.noticesState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
