import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Panel } from 'react-bootstrap';

import { ModalAddRecord } from './modals/index';

import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

class Records extends Component {
	constructor(props, context) {
		super(props, context);
	
		this.state = {
		  data: [],
		  typeInputValue: '',
		  distanceInputValue: ''
		};
	}

	componentDidMount() {
		const { ApiServiceActionCreators: {
					getAllRecordsAction
				}
			  } = this.props;
		getAllRecordsAction();
	}

	render() {
		const { directories: { dataRecords } } = this.props;

		let data = dataRecords;

		let records = Object.keys(data).map((item, index) => {
			return (
					<li	key={index}>
						<Panel bsStyle="primary">
							<Panel.Body>
								{data[item].type}
								{data[item].distance}
							</Panel.Body>
						</Panel>
					</li>
				)
			}
		);
		
		return (
            <div>
                <ul className="list-unstyled">
                    {records}
                </ul>

                <ModalAddRecord/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notices: state.noticesState,
		directories: state.directoriesState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Records);
