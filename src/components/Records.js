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
		const { records: { dataRecords } } = this.props;

		let data = dataRecords;

		let recordsList = Object.keys(data).map((item, index) => {
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
                    {recordsList}
                </ul>

                <ModalAddRecord {...this.props}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		records: state.recordsState,
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
