import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
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
		  key: 2,
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
		const {} = this.props;

		console.log('Home Page', this.props)

		return (
            <div>
				{
					this.props.records.error.isError
						? <Alert bsStyle="danger">
							<h4>{this.props.records.error.request}</h4>
							</Alert>
						: null
				}

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
		records: state.recordsState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
