import React, { Component } from 'react';
import { Button, Modal, FormControl, Tooltip, 
		 OverlayTrigger, FormGroup, ControlLabel } from 'react-bootstrap';

import AutocompleteTags from '../autocompletes/AutocompleteTags';

const tooltipAdd = (
  <Tooltip id="tooltip">Create new notice</Tooltip>
);
const tooltipSave = (
	<Tooltip id="tooltip">Confirm notice creation</Tooltip>
);
const tooltipCancel = (
	<Tooltip id="tooltip">Cancel notice creation</Tooltip>
);

class ModalAddNotice extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			showModal: false,
			inputValue: '',
			isInputValid: true,
			isTextareaValid: true,
			textareaValue: '',
		};
	}

	close = () => {
		const { NoticesActionCreators: {
					clearTagsInNoticeAction
				}
			  } = this.props;
		
		this.setState({ 
			showModal: false,
			isInputValid: true,
			isTextareaValid: true
		});

		clearTagsInNoticeAction();
	}

	open = () => {
		this.setState({ showModal: true });
	}

	updateInputValue = (evt) => {
		this.setState({
			inputValue: evt.target.value,
			isInputValid: true
		});
	}

	updateTextareaValue = (evt) => {
		this.setState({
			textareaValue: evt.target.value,
			isTextareaValid: true
		});
	}

	render() {
		const { ApiServiceActionCreators: {
					createNoticeAction
				}, 
				directories, 
				notices
			  } = this.props;

		return (
			<span>
				<OverlayTrigger placement="bottom" 
								overlay={tooltipAdd}>
					<Button bsStyle="primary"
							disabled={isNaN(directories.selectedDirectory) || (directories.selectedDirectory === 1)}
							onClick={this.open}>
						ADD NOTICE
					</Button>
				</OverlayTrigger>

				<Modal show={this.state.showModal} 
					   onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Add Notice to the current directory.</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup controlId="formControlsInput"
								   className={!this.state.isInputValid ? "has-error" : null}>
							<ControlLabel>Title:</ControlLabel>
							<FormControl type="text" 
										 placeholder="Title (name of file)"
										 value={this.state.inputValue}
										 onChange={this.updateInputValue}/>
						</FormGroup>
						<FormGroup controlId="formControlsTextarea"
								   className={!this.state.isTextareaValid ? "has-error" : null}>
							<ControlLabel>Description:</ControlLabel>
							<FormControl componentClass="textarea" 
										 placeholder="Text info about your file" 
										 value={this.state.textareaValue}
										 onChange={this.updateTextareaValue}/>
						</FormGroup>
						<FormGroup controlId="formControlsTag">
							<ControlLabel>Tags:</ControlLabel>
							<AutocompleteTags {...this.props}/>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<OverlayTrigger placement="top" 
										overlay={tooltipCancel}>
							<Button onClick={this.close}>Close</Button>
						</OverlayTrigger>
						<OverlayTrigger placement="top" 
										overlay={tooltipSave}>
							<Button bsStyle="primary"
									onClick={() => {
										if ((this.state.inputValue !== '') && (this.state.textareaValue !== '')) {
											createNoticeAction({
												title: this.state.inputValue,
												description: this.state.textareaValue,
												directoryId: directories.selectedDirectory,
												tags: notices.listOfTagsInNotice
											})
											this.close();
											this.setState({
												inputValue: '',
												isInputValid: true,
												isTextareaValid: true,
												textareaValue: '',
												tags: [],
											});
										}

										if ((this.state.inputValue === '') && (this.state.textareaValue !== '')) {
											this.setState({
												isInputValid: false,
												isTextareaValid: true
											});
										}

										if ((this.state.inputValue !== '') && (this.state.textareaValue === '')) {
											this.setState({
												isInputValid: true,
												isTextareaValid: false
											});
										}

										if ((this.state.inputValue === '') && (this.state.textareaValue === '')) {
											this.setState({
												isInputValid: false,
												isTextareaValid: false
											});
										}
									}}>
								Ok
							</Button>
						</OverlayTrigger>
					</Modal.Footer>
				</Modal>
			</span>
		);
	}
};

export default ModalAddNotice;