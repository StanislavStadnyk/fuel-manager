import React, { Component } from 'react';
import { Button, Modal, FormControl, Tooltip, OverlayTrigger } from 'react-bootstrap';

const tooltipAdd = (
	<Tooltip id="tooltip">Create new directory</Tooltip>
);
const tooltipSave = (
	<Tooltip id="tooltip">Confirm directory creation</Tooltip>
);
const tooltipCancel = (
	<Tooltip id="tooltip">Cancel directory creation</Tooltip>
);

class ModalAddDirectory extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			showModal: false,
			inputValue: '',
			isValid: false
		};
	}

	close = () => {
		this.setState({ 
			showModal: false,
			isValid: false
		});
	}

	open = () => {
		this.setState({ showModal: true });
	}

	updateInputValue = (evt) => {
		this.setState({
			inputValue: evt.target.value,
			isValid: false
		});
	}

	render() {
		const { ApiServiceActionCreators: {
					createDirectoryAction
				}
			  } = this.props;

		return (
			<div>
				<OverlayTrigger placement="right" 
								overlay={tooltipAdd}>
					<Button bsStyle="success"
							onClick={this.open}>
						ADD DIRECTORY
					</Button>
				</OverlayTrigger>

				<Modal show={this.state.showModal} 
					   onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Create new directory.</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className={this.state.isValid ? "has-error" : null}>
							<FormControl type="text" 
										placeholder="Name of directory"
										value={this.state.inputValue}
										onChange={this.updateInputValue}/>
						</div>
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
										if (this.state.inputValue !== '') {
											createDirectoryAction({
												parentId: this.props.params.id, 
												name: this.state.inputValue
											})
											this.close();
											this.setState({
												inputValue: '',
												isValid: false
											});
										} else {
											this.setState({isValid: true});
										}
									}}>
								Ok
							</Button>
						</OverlayTrigger>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
};

export default ModalAddDirectory;