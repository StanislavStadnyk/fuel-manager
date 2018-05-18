import React, { Component } from 'react';
import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

// import * as firebase from 'firebase';

class ModalAddRecord extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			showModal: false,
			typeInputValue: '',
			distanceInputValue: '',
			isTypeInputValid: true,
			isDistanceInputValid: true,
		};
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

	addNewRecord = (type, distance) => {
		console.log('addNewRecord', this.props)
		const { ApiServiceActionCreators: {
					createRecordAction
				}
			  } = this.props;
			  
		createRecordAction({
			"distance": distance,
			"type": type
		});
	}

	distanceInputValue = (evt) => {
		this.setState({ 
			distanceInputValue: evt.target.value
		});
	}

	typeInputValue = (evt) => {
		this.setState({ 
			typeInputValue: evt.target.value
		});
	}

	render() {
		return (
			<span>
				<Button bsStyle="primary"
						bsSize="sm"
						disabled={false}
						onClick={this.open}>
					ADD RECORD
				</Button>

				<Modal show={this.state.showModal} 
					   onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Add new record.</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup controlId="formControlsType"
								   className={!this.state.isTypeInputValid ? "has-error" : null}>
							<ControlLabel>Type:</ControlLabel>
							<FormControl type="text" 
										 placeholder="Type"
										 onChange={this.typeInputValue}/>
						</FormGroup>
						<FormGroup controlId="formControlsDistance"
								   className={!this.state.isDistanceInputValid ? "has-error" : null}>
							<ControlLabel>Distance:</ControlLabel>
							<FormControl type="text" 
										 placeholder="Distance" 
										 onChange={this.distanceInputValue}/>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						
							<Button onClick={this.close}>Close</Button>
						
							<Button bsStyle="primary"
									onClick={() => {
										this.addNewRecord(this.state.typeInputValue, this.state.distanceInputValue)
									}}>
								Ok
							</Button>
						
					</Modal.Footer>
				</Modal>
			</span>
		);
	}
};

export default ModalAddRecord;