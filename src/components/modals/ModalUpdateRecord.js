import React, { Component, PropTypes } from 'react';
// import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

// import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';

// Mui icons
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

class ModalUpdateRecord extends Component {
	constructor(props) {
		super(props);

		console.log('ModalUpdateRecord', props)
		
		this.state = { 
			showModal: false,

			//typeInputValue: props.item.value.type,
			odometerInputValue: props.item.value.odometer,
			dateInputValue: new Date(props.item.value.date),
			volumeInputValue: props.item.value.volume,
			costInputValue: props.item.value.volume,

			typeSelectValue: props.item.value.type,

			isTypeInputValid: true,
			isOdometerInputValid: true,
			isDateInputValid: true,
			isVolumeInputValid: true,

			placeholderOdometer: 'Odometer'
		};
	}

	handleDayChange = (dateInputValue) => {
		this.setState({
			dateInputValue: dateInputValue
		});
	}

	close = () => {
		this.setState({ 
			showModal: false,
			isInputValid: true,
			isTextareaValid: true
		});
	}

	open = () => {
		this.setState({ showModal: true });
	}

	updateRecord = (date, odometer, type, volume, cost) => {
		console.log('updateRecord', this.props)
			  
		this.props.updateRecordAction({
			"recordId": this.props.item.id,
			"userId": this.props.userId,
			"date": date,
			"odometer": odometer,
			"volume": volume,
			"type": type,
			"cost": cost,
		});
	}

	odometerInputValue = (evt) => {
		this.setState({ 
			odometerInputValue: evt.target.value
		});
	}

	volumeInputValue = (evt) => {
		this.setState({ 
			volumeInputValue: evt.target.value
		});
	}

	costInputValue = (evt) => {
		this.setState({ 
			costInputValue: evt.target.value
		});
	}

	handleModalOpen = () => {
		this.setState({ showModal: true });
	};
	
	handleModalClose = () => {
		this.setState({ showModal: false });
	};

	handleSelectChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { dateInputValue,
				odometerInputValue,
				typeSelectValue,
				volumeInputValue,
				costInputValue 
			} = this.state;

		return (
			<div>
				<span onClick={this.handleModalOpen}>
					Update
				</span>
				<Dialog
					className="modal-update-record"
					open={this.state.showModal}
					onClose={this.handleModalClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Update record</DialogTitle>
					<DialogContent>
						<Grid container spacing={24}>
							{/* Date */}
							<Grid item xs={2}>
								<div className="icon-holder no-label"><DateRangeIcon /></div>
							</Grid>
							<Grid item xs={10}>
								<DayPickerInput 
									value={dateInputValue}
									onDayChange={this.handleDayChange}
									dayPickerProps={{ 
										selectedDays: dateInputValue,
										disabledDays: {after: new Date()}
									}}
								/>
							</Grid>
							
							{/* Odometer */}
							<Grid item xs={2}>
								<div className="icon-holder"><SwapCallsIcon /></div>
							</Grid>
							<Grid item xs={10}>
								<FormControl className="form-control">
									<InputLabel htmlFor="label-odometer">Odometer:</InputLabel>
									<Input id="label-odometer"
										   value={odometerInputValue}
										   onChange={this.odometerInputValue} />
								</FormControl>
							</Grid>

							{/* Volume & Type */}
							<Grid item xs={2}>
								<div className="icon-holder"><LocalGasStationIcon /></div>
							</Grid>
							<Grid item xs={5}>
								<FormControl className="form-control">
									<InputLabel htmlFor="label-volume">Volume:</InputLabel>
									<Input id="label-volume"
										   value={volumeInputValue}
										   onChange={this.volumeInputValue} />
								</FormControl>
							</Grid>
							<Grid item xs={5}>
								<FormControl className="form-control">
									<InputLabel htmlFor="label-type">Type</InputLabel>
									<Select value={typeSelectValue}
											onChange={this.handleSelectChange}
											inputProps={{
												name: 'typeSelectValue',
												id: 'label-type',
											}}
									>
										<MenuItem value="A-98">A-98</MenuItem>
										<MenuItem value="A-95">A-95</MenuItem>
										<MenuItem value="A-92">A-92</MenuItem>
										<MenuItem value="Diesel">Diesel</MenuItem>
										<MenuItem value="Gas">Gas</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							{/* Cost */}
							<Grid item xs={2}>
								<div className="icon-holder"><AttachMoneyIcon /></div>
							</Grid>
							<Grid item xs={10}>
								<FormControl className="form-control">
									<InputLabel htmlFor="label-cost">Cost:</InputLabel>
									<Input id="label-cost"
										   value={costInputValue}
										   onChange={this.costInputValue} />
								</FormControl>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button variant="fab"
								color="primary" 
								mini 
								onClick={this.handleModalClose}>
							<ClearIcon />
						</Button>
						<Button variant="fab"
								color="secondary" 
								onClick={() => {
									this.updateRecord(
										dateInputValue.toJSON(),
										+odometerInputValue,
										typeSelectValue,
										+volumeInputValue,
										costInputValue,
									);
								}}
						>
							<DoneIcon />
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
};

export default ModalUpdateRecord;