import React, { Component } from 'react';
import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class ModalAddRecord extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			showModal: false,

			typeInputValue: '',
			odometerInputValue: '',
			dateInputValue: new Date(),
			volumeInputValue: '',

			isTypeInputValid: true,
			isOdometerInputValid: true,
			isDateInputValid: true,
			isVolumeInputValid: true,
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
		const { ApiServiceActionCreators: {
					createRecordAction
				}
			  } = this.props;
			  
		createRecordAction({
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

	render() {
		const { dateInputValue } = this.state;

		return (
			<div>
				<Button bsStyle="primary"
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
				</Modal>
			</div>
		);
	}
};

export default ModalAddRecord;