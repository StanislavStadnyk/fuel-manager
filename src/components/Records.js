import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Panel, Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa'

import { ModalAddRecord, ModalUpdateRecord } from './modals/index';
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
			showModal: false,
			modalId: null
		}
	}

	componentDidMount() {
		const { ApiServiceActionCreators: { getAllRecordsAction },
				authorization: { userId }
			  } = this.props;
		console.log('getAllRecordsAction', this.props);
		getAllRecordsAction(userId);
	}

	handleModalOpen = (index) => {
		//console.log('onUpdateClick', index);
		this.setState({ 
			showModal: true,
			modalId: index
		});
	};

	handleModalClose = () => {
		//console.log('onModalClose');
		this.setState({ 
			showModal: false ,
			modalId: null
		});
	};

	render() {
		const { records: { dataRecords },
				authorization: { userId },
				ApiServiceActionCreators: {
					deleteRecordAction,
					updateRecordAction
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
								cost: {item.value.cost} <br/>
							</p>
							
							<MenuCustom item={item}
										index={index}
										userId={userId} 
										deleteRecordAction={deleteRecordAction}
										onBtnUpdateClick={this.handleModalOpen}/>

							{this.state.modalId === index 
								? <ModalUpdateRecord onModalClose={this.handleModalClose} 
													 showModal={this.state.showModal}
													 updateRecordAction={updateRecordAction}
													 item={item}
													 userId={userId}/>
								: null
							}
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

class MenuCustom extends Component {
	constructor(props) {
		super(props)

		this.state = {
			anchorEl: null,
			// menuHidden: 'visible',
			showModal: false
		};
	}

	handleMenuClick = event => {
		this.setState({ 
			anchorEl: event.currentTarget,
			// menuHidden: 'visible'
		});
	};
	
	handleMenuClose = () => {
		this.setState({ 
			anchorEl: null,
			// menuHidden: 'visible'
		});
	};

	handleMenuCloseDelete = (obj) => {
		this.setState({ anchorEl: null });
		this.props.deleteRecordAction(obj);
		console.log('obj', obj);
	};

	// handleMenuCloseUpdate = (obj) => {
	// 	this.setState({ anchorEl: null });
	// 	console.log('obj', obj);
	// };

	// handleMenuHide() {
	// 	this.setState({ menuHidden: 'hidden'})
	// }

	onBtnUpdateClick = (index) => {
		this.setState({ anchorEl: null });
		this.props.onBtnUpdateClick(index);
	};

	render() {
		const { anchorEl, menuHidden } = this.state;

		return (
			<div>
				<IconButton
					aria-label="More"
					aria-owns={anchorEl ? `long-menu-${this.props.item.id}` : null}
					aria-haspopup="true"
					onClick={this.handleMenuClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					//style={{ visibility: menuHidden}}
					id={`long-menu-${this.props.item.id}`}
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleMenuClose}
				>
					{/* <MenuItem onClick={() => this.handleMenuHide()}> */}
					<MenuItem onClick={() => this.onBtnUpdateClick(this.props.index)}>
						Update
					</MenuItem>
					<MenuItem onClick={() => this.handleMenuCloseDelete({record: this.props.item, userId: this.props.userId})}>
						Delete
					</MenuItem>
				</Menu>
			</div>
		)
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
