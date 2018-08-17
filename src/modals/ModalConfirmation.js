import React, { Component } from 'react';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';

const tooltipSave = (
	<Tooltip id="tooltip">Confirmation</Tooltip>
);
const tooltipCancel = (
	<Tooltip id="tooltip">Cancel</Tooltip>
);

class ModalConfirmation extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			showModal: false,
		};
	}

	close = () => {
		this.setState({ showModal: false });
	}

	open = () => {
		this.setState({ showModal: true });
	}

	render() {
		const { modalFunction, 
				modalBtnStyle, 
				modalBtnNoStyle, 
			    modalBtnIcon, 
			    modalTooltip, 
			    modalText
			  } = this.props;
		
		return (
			<div style={{display: "inline-block"}}>
				<OverlayTrigger placement="top" 
								overlay={modalTooltip}>
					<Button bsSize="xsmall"
							bsStyle={modalBtnStyle}
							className={modalBtnNoStyle}
							onClick={this.open}>
						<i className={modalBtnIcon}></i>
					</Button>
				</OverlayTrigger>

				<Modal show={this.state.showModal} 
					   onHide={this.close}
					   bsSize="small">
					<Modal.Header closeButton>
						<Modal.Title>Are you sure that you want to remove this {modalText}</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<OverlayTrigger placement="top" 
										overlay={tooltipCancel}>
							<Button onClick={this.close}>Close</Button>
						</OverlayTrigger>
						<OverlayTrigger placement="top" 
										overlay={tooltipSave}>
							<Button bsStyle="primary"
									onClick={modalFunction}>
								Ok
							</Button>
						</OverlayTrigger>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
};

export default ModalConfirmation;