import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

import { compose } from 'redux';

import { ModalConfirmation } from './modals/index';

const tooltipRemove = (
	<Tooltip id="tooltip">Remove notice</Tooltip>
);
const tooltipCancel = (
	<Tooltip id="tooltip">Cancel</Tooltip>
);
const tooltipEdit = (
	<Tooltip id="tooltip">Edit notice</Tooltip>
);
const tooltipSave = (
	<Tooltip id="tooltip">Save changes</Tooltip>
);
const tooltipNotice = (
	<Tooltip id="tooltip">Notice</Tooltip>
);
const tooltipTitle = (
	<Tooltip id="tooltip">Title</Tooltip>
);

const noticeSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},

	endDrag(props, monitor, component) {
		const { ApiServiceActionCreators: {
					dndNoticesActionServer 
				}
			  } = props;

		dndNoticesActionServer(props);
	}
}

const noticeTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveNotice(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
}

function collectDrop(connect) {
	return {
	  connectDropTarget: connect.dropTarget(),
	};
}

function collectDrag(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

class Notice extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		moveNotice: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		
		this.state = { 
			showHide: true,
			inputValue: this.props.notice.title
		};
	}

	updateInputValue = (evt) => {
		this.setState({ 
			inputValue: evt.target.value
		});
	}

	deleteNotice = () => {
		const { ApiServiceActionCreators: {
					deleteNoticeAction
				}, 
				notice 
			  } = this.props;

		deleteNoticeAction(notice.id);
	}

	render() {
		const { ApiServiceActionCreators: {
					updateNoticeAction
				},
				directories, 
				notice,

				isDragging, 
				connectDragSource, 
				connectDropTarget
			  } = this.props;

		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<li className="text-center panel-body pull-left" style={{ opacity }}>
				<div className="notice-item">
					<div className="notice-btns">
						{!this.state.showHide 
							? <div>
								<OverlayTrigger placement="top" 
												overlay={tooltipSave}>
									<i className="glyphicon glyphicon-ok"
									   onClick={() => {
											this.setState({
												showHide: !this.state.showHide
											}, () => updateNoticeAction({
												id: notice.id,
												title: this.state.inputValue,
												directoryId: directories.selectedDirectory,
												tags: notice.tags,
												description: notice.description,
												position: notice.position
											})); 
									}}></i>
								</OverlayTrigger>

								<OverlayTrigger placement="top" 
												overlay={tooltipCancel}>
									<i className="glyphicon glyphicon-share-alt"
									   onClick={() => {
											this.setState({
												showHide: !this.state.showHide,
												inputValue: this.props.notice.title
											})
									}}></i>
								</OverlayTrigger>
							</div>
						
							: <div>
								<ModalConfirmation modalBtnNoStyle="true"
												   modalBtnIcon="glyphicon glyphicon-remove"
												   modalTooltip={tooltipRemove}
												   modalText="notice"
												   modalFunction={this.deleteNotice}/>
								
								<OverlayTrigger placement="top" 
												overlay={tooltipEdit}>
									<i className="glyphicon glyphicon-edit"
									   onClick={() => {
											this.setState({
												showHide: !this.state.showHide
											}, () => this.inputEdit.focus()); 
									}}></i>
								</OverlayTrigger>
							</div>
						}	
					</div>

					<OverlayTrigger placement="left" 
									overlay={tooltipNotice}>
						<Link to={`/notices/${notice.id}`}
							  target="_blank">
							<i className="glyphicon glyphicon-file"></i>
						</Link>
					</OverlayTrigger>

					<div>
						<OverlayTrigger placement="bottom" 
										overlay={tooltipTitle}>
							<input type="text" 
								   value={this.state.inputValue}
								   onChange={this.updateInputValue}
								   disabled={this.state.showHide}
								   ref={(ip) => this.inputEdit = ip}/>
						</OverlayTrigger>
					</div>
				</div>
			</li>
		));
	}
}

const enhance = compose(
	DropTarget(ItemTypes.NOTICE, noticeTarget, collectDrop),
	DragSource(ItemTypes.NOTICE, noticeSource, collectDrag)
)

export default enhance(Notice);
