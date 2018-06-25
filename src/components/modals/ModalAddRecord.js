import React, { Component } from 'react';
import { DATE_FORMAT } from '../../constants';
// import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

// import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from "react-day-picker/moment";
  
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

class ModalAddRecord extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			showModal: false,

			typeInputValue: '',
			odometerInputValue: '',
			dateInputValue: new Date(),
			volumeInputValue: '',
			costInputValue: '',

			typeSelectValue: 'A-98',

			isTypeInputNotValid: false,
			isOdometerInputNotValid: false,
			isDateInputNotValid: false,
			isVolumeInputNotValid: false,
			
			disableAddNewRecord: true
		};
	}

	handleDayChange = (dateInputValue) => {
		if (!parseDate(dateInputValue)) {
			this.setState({
				isDateInputNotValid: true,
				dateInputValue: ""
			}, () => this.validation());
		} else {
			this.setState({
				isDateInputNotValid: false,
				dateInputValue: dateInputValue
			}, () => this.validation());
		}
	}

	validation = () => {
		const { odometerInputValue,
			volumeInputValue,
			costInputValue,
			dateInputValue
			  } = this.state;

		console.log( 
			odometerInputValue,
			volumeInputValue,
			costInputValue, dateInputValue)
			  
		if (odometerInputValue && volumeInputValue && costInputValue && dateInputValue) {
			this.setState({
				disableAddNewRecord: false
			})
		} else {
			this.setState({
				disableAddNewRecord: true
			})
		}
	}

	close = () => {
		this.setState({ 
			showModal: false,
			isInputNotValid: false,
			isTextareaNotValid: false
		});
	}

	open = () => {
		this.setState({ showModal: true });
	}

	addNewRecord = (date, odometer, type, volume, cost) => {
		const { ApiServiceActionCreators: { createRecordAction},
				authorization: { userId }
			  } = this.props;
			  
		createRecordAction({
			"userId": userId,
			"date": date,
			"odometer": odometer,
			"volume": volume,
			"type": type,
			"cost": cost,
		});
	}

	odometerInputValue = (evt) => {
		if (!evt.target.value) {
			this.setState({ 
				isOdometerInputNotValid: true,
				odometerInputValue: "",
			}, () => this.validation())
		} else {
			this.setState({ 
				isOdometerInputNotValid: false,
				odometerInputValue: evt.target.value,
			}, () => this.validation())
		}
	}

	volumeInputValue = (evt) => {
		if (!evt.target.value) {
			this.setState({ 
				isVolumeInputNotValid: true,
				volumeInputValue: "",
			}, () => this.validation())
		} else {
			this.setState({ 
				isVolumeInputNotValid: false,
				volumeInputValue: evt.target.value,
			}, () => this.validation())
		}
	}

	typeInputValue = (evt) => {
		this.setState({ 
			typeInputValue: evt.target.value
		});
	}

	costInputValue = (evt) => {
		if (!evt.target.value) {
			this.setState({ 
				isCostInputNotValid: true,
				costInputValue: "",
			}, () => this.validation())
		} else {
			this.setState({ 
				isCostInputNotValid: false,
				costInputValue: evt.target.value,
			}, () => this.validation())
		}
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
				costInputValue,

				isDateInputNotValid,
				isOdometerInputNotValid,
				isVolumeInputNotValid,
				isCostInputNotValid,

				disableAddNewRecord
			} = this.state;

		return (
			<div>
				<Button variant="fab"
						color="secondary"
						className="btn-add-record"
						onClick={this.handleModalOpen}>
					<AddIcon />
				</Button>
				<Dialog
					className="modal-add-record"
					open={this.state.showModal}
					onClose={this.handleModalClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Add new record</DialogTitle>
					<DialogContent>
						<Grid container spacing={24}>
							{/* Date */}
							<Grid item xs={2}>
								<div className="icon-holder no-label"><DateRangeIcon /></div>
							</Grid>
							<Grid item xs={10}>
								<FormControl className={isDateInputNotValid ? "form-control error" : "form-control"}>
									<InputLabel className="form-control-date">Date:</InputLabel>
									<DayPickerInput
										formatDate={formatDate}
										format={DATE_FORMAT}
										parseDate={parseDate}
										value={dateInputValue}
										onDayChange={this.handleDayChange}
										placeholder={DATE_FORMAT}
										dayPickerProps={{ 
											selectedDays: dateInputValue,
											disabledDays: {after: new Date()}
										}}
									/>
								</FormControl>
							</Grid>
							
							{/* Odometer */}
							<Grid item xs={2}>
								<div className="icon-holder"><SwapCallsIcon /></div>
							</Grid>
							<Grid item xs={10}>
								<FormControl className="form-control">
									<InputLabel htmlFor="label-odometer">Odometer:</InputLabel>
									<Input id="label-odometer"
										   error={isOdometerInputNotValid}
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
										   error={isVolumeInputNotValid}
										   onChange={this.volumeInputValue} />
								</FormControl>
							</Grid>
							<Grid item xs={5}>
								<FormControl className="form-control">
									<InputLabel htmlFor="label-type">Type</InputLabel>
									<Select	value={typeSelectValue}
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
										   error={isCostInputNotValid}
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
								disabled={disableAddNewRecord}
								onClick={() => {
									this.addNewRecord(
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

export default ModalAddRecord;