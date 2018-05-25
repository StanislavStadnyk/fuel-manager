import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Panel, Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa'

import { ModalAddRecord } from './modals/index';
import moment from 'moment';
import { sortObjectByParam } from '../utils/index';

import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

class Records extends Component {
	componentDidMount() {
		const { ApiServiceActionCreators: {
					getAllRecordsAction
				}
			  } = this.props;
		getAllRecordsAction();
	}

	render() {
		const { records: { dataRecords },
				ApiServiceActionCreators: {
					deleteRecordAction
				}, 
			  } = this.props;

		let arrRecords = sortObjectByParam(dataRecords, 'odometer');

		let recordsList = arrRecords.map((item, index) => {
			console.log(item);

			let date = moment(item.value.date).format('DD.MM.YYYY')
			return (
				<li	key={index}>
					<Panel bsStyle="primary">
						<Panel.Body>
							<p>
								date: {date} <br/>
								odometer: {item.value.odometer} <br/>
								volume: {item.value.volume} <br/>
								type: {item.value.type} <br/>
							</p>
							
							<Button bsStyle="danger"
									onClick={() => {
										deleteRecordAction(item);
									}}>
								-
							</Button>
							<FontAwesome.FaEllipsisH />
							
						</Panel.Body>
					</Panel>
				</li>
			)
		})

		// let recordsList = Object.keys(dataRecords).map((item, index) => {
		// 	let date = moment(dataRecords[item].date).format('DD.MM.YYYY')
		// 	return (
		// 			<li	key={index}>
		// 				<Panel bsStyle="primary">
		// 					<Panel.Body>
		// 						date: {date} <br/>
		// 						odometer: {dataRecords[item].odometer} <br/>
		// 						volume: {dataRecords[item].volume} <br/>
		// 						type: {dataRecords[item].type} <br/>
								
		// 					</Panel.Body>
		// 				</Panel>
		// 			</li>
		// 		)
		// 	}
		// );
		
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
