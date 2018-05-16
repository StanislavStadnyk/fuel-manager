import React, { Component } from 'react';
import { Tooltip, OverlayTrigger, Alert } from 'react-bootstrap';
import { Link } from 'react-router';

import { connect } from 'react-redux';

import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

const tooltipNotice = (
	<Tooltip id="tooltip">Notice</Tooltip>
);

class SearchPage extends Component {
	componentDidMount = () => {
		const { ApiServiceActionCreators : {
					getAllNoticesAction
				}
			  } = this.props;

		getAllNoticesAction();
	}

	render() {
		const { notices, params } = this.props;
		let searchedNotices = [];

		if (notices.advancedSearch) {
			searchedNotices = notices.data.filter((notice) => 
				((notice.description.indexOf(params.id) >= 0) || (notice.tags.indexOf(params.id) >= 0))
			);
		} else {
			searchedNotices = notices.data.filter((notice) => 
				(notice.title.indexOf(params.id) >= 0)
			);
		}
		
		return (
			<div>
				<div className="container">
					{
						this.props.notices.error.isError
							? <Alert bsStyle="danger">
								<h4>{this.props.notices.error.request}</h4>
							  </Alert>
							: null
					}

					{/* Header */}
					<h1><Link to="/">Manager</Link></h1>

					{/* Content */}
					<div className="clearfix">
						<h3>Searched notices</h3>
						<div className="panel panel-default">
							<div className="panel-body">
								<ul className="list-unstyled notices-list-2 clearfix">
									{searchedNotices.map((notice, i) => {
										return (
											<li className="text-center panel-body pull-left" 
												key={notice.id}>
												<div className="notice-item">
													<OverlayTrigger placement="bottom" 
																	overlay={tooltipNotice}>
														<Link to={`/notices/${notice.id}`}
															  target="_blank">
															<i className="glyphicon glyphicon-file"></i>
															<div>{notice.title}</div>
														</Link>
													</OverlayTrigger>
												</div>
											</li>
										)
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notices: state.noticesState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
