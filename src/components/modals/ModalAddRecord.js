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
			typeSelectValue: '',

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

	addNewRecord = (date, odometer, type, volume) => {
		console.log('addNewRecord', this.props)
		const { ApiServiceActionCreators: { createRecordAction},
				authorization: { userId }
			  } = this.props;
			  
		createRecordAction({
			"userId": userId,
			"date": date,
			"odometer": odometer,
			"type": type,
			"volume": volume,
		});
	}

	odometerInputValue = (evt) => {
		this.setState({ 
			odometerInputValue: evt.target.value
		});
	}

	typeInputValue = (evt) => {
		this.setState({ 
			typeInputValue: evt.target.value
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

	handleClickOpen = () => {
		this.setState({ showModal: true });
	  };
	
	handleClose = () => {
		this.setState({ showModal: false });
	};

	// handleSelectChange = name => event => {
	// 	this.setState({ [name]: event.target.value });
	// };

	handleSelectChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { dateInputValue, typeSelectValue } = this.state;

		return (
			<div>
				{/* <Button bsStyle="primary"
						className="btn-add-record"
						bsSize="sm"
						disabled={false}
						onClick={this.open}>
					+
				</Button>

				<Modal show={this.state.showModal} 
					   onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Add new record.</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup controlId="formControlsType"
								   className={!this.state.isTypeInputValid ? "has-error" : null}>
							<ControlLabel>Date:</ControlLabel>
							<div>
								<DayPickerInput 
									value={dateInputValue}
									onDayChange={this.handleDayChange}
									dayPickerProps={{ 
										selectedDays: dateInputValue,
										disabledDays: {after: new Date()}
									}}
								/>
							</div>
						</FormGroup>
						
						<FormGroup controlId="formControlsodometer"
								   className={!this.state.isOdometerInputValid ? "has-error" : null}>
							<ControlLabel>odometer:</ControlLabel>
							<FormControl type="text" 
										 placeholder="odometer" 
										 onChange={this.odometerInputValue}/>
						</FormGroup>
						<div className="row">
							<div className="col-xs-6">
								<FormGroup controlId="formControlsVolume"
										   className={!this.state.isVolumeInputValid ? "has-error" : null}>
									<ControlLabel>Volume:</ControlLabel>
									<FormControl type="text" 
											placeholder="Volume"
											onChange={this.volumeInputValue}/>
								</FormGroup>
							</div>
							<div className="col-xs-6">
								<FormGroup controlId="formControlsType"
										   className={!this.state.isTypeInputValid ? "has-error" : null}>
									<ControlLabel>Type:</ControlLabel>
									<FormControl componentClass="select" 
												 placeholder="Type"
												 onChange={this.typeInputValue}>
										<option value="">Choose type</option>
										<option value="A-98">A-98</option>
										<option value="A-95">A-95</option>
										<option value="A-92">A-92</option>
										<option value="Diesel">Diesel</option>
										<option value="Gas">Gas</option>
									</FormControl>
								</FormGroup>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
					
						<Button bsStyle="primary"
								onClick={() => {
									console.log('on click addNewRecod', this.state.dateInputValue.toJSON());
									this.addNewRecord(
										this.state.dateInputValue.toJSON(),
										+this.state.odometerInputValue,
										this.state.typeInputValue,
										this.state.volumeInputValue,
									);
								}}>
							Ok
						</Button>
					</Modal.Footer>
				</Modal> */}

				<Button variant="fab"
						color="secondary" 
						onClick={this.handleClickOpen}>
						<AddIcon />
				</Button>
				<Dialog
					className="modal-add-record"
					open={this.state.showModal}
					onClose={this.handleClose}
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
									onChange={this.volumeInputValue} />
							</FormControl>
						</Grid>
						<Grid item xs={5}>
							<FormControl className="form-control">
								<InputLabel htmlFor="label-type">Type</InputLabel>
								<Select
									value={typeSelectValue}
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
									onChange={this.costInputValue} />
							</FormControl>
						</Grid>
					{/* <FormGroup controlId="formControlsodometer"
								   className={!this.state.isOdometerInputValid ? "has-error" : null}>
							<ControlLabel>odometer:</ControlLabel>
							<FormControl type="text" 
										 placeholder="odometer" 
										 onChange={this.odometerInputValue}/> */}

					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant="fab"
							color="primary" 
							mini 
							onClick={this.handleClose}>
						<ClearIcon />
					</Button>
					<Button variant="fab"
							color="secondary" 
							onClick={() => {
								this.addNewRecord(
									this.state.dateInputValue.toJSON(),
									+this.state.odometerInputValue,
									//this.state.typeInputValue,
									this.state.volumeInputValue,
								);
						}}>
						<DoneIcon />
					</Button>
				</DialogActions>
				</Dialog>


			</div>
		);
	}
};

export default ModalAddRecord;