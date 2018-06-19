import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Panel, Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa'

import { ModalAddRecord } from './modals/index';
import moment from 'moment';
import { sortObjectByParam } from '../utils/index';

import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

// Mui
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class Records extends Component {
	constructor(props) {
		super(props)

		this.state = {
			anchorEl: null,
		};
	}

	componentDidMount() {
		const { ApiServiceActionCreators: { getAllRecordsAction },
				authorization: { userId }
			  } = this.props;
		console.log('getAllRecordsAction', this.props);
		getAllRecordsAction(userId);
	}

	handleMenuClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};
	
	handleMenuClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;
		const { records: { dataRecords },
				authorization: { userId },
				ApiServiceActionCreators: {
					deleteRecordAction
				}, 
			  } = this.props;

		let arrRecords = sortObjectByParam(dataRecords, 'odometer');

		let recordsList = arrRecords.map((item, index) => {
			//console.log(item);

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
							
							<IconButton
								aria-label="More"
								aria-owns={anchorEl ? 'long-menu' : null}
								aria-haspopup="true"
								onClick={this.handleMenuClick}
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="long-menu"
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={this.handleMenuClose}
							>
								<MenuItem>
									<ModalAddRecord {...this.props}/>
								</MenuItem>
								<MenuItem onClick={() => deleteRecordAction({record: item, userId: userId})}>
									Delete
								</MenuItem>
							</Menu>
							
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
		authorization: state.authorizationState,
		
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
