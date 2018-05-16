import React, { Component } from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Notice from './Notice';

class NoticesInDirectory extends Component {
	constructor(props) {
		super(props)

		this.moveNotice = this.moveNotice.bind(this)
	}

	moveNotice(dragIndex, hoverIndex) {
		const { notices, 
				NoticesActionCreators: {
					dndNoticesActionLocal
				}
			  } = this.props;
		const dragNotice = notices[dragIndex];

		dndNoticesActionLocal({
			dragNotice: dragNotice, 
			dragIndex: dragIndex, 
			hoverIndex: hoverIndex,
			noticesFiltered: notices
		});
	}

	render() {
		const { notices } = this.props;

		return (
			<ul className="list-unstyled notices-list clearfix">
				{notices.map((notice, i) => {
					return (
						<Notice
							key={notice.id}
							index={i}
							id={notice.id}
							notice={notice}
							moveNotice={this.moveNotice}
							{...this.props}
						/>
					)
				})}
			</ul>
		)
	}
}

export default DragDropContext(HTML5Backend)(NoticesInDirectory);