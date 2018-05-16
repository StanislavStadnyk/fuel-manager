import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router';

import { connect } from 'react-redux';

import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

class NoticePage extends Component {
	componentDidMount = () => {
		const { ApiServiceActionCreators: {
					getAllNoticesAction
				}
			  } = this.props;

		getAllNoticesAction();
	}

	render() {
		const { notices, params } = this.props;
		
		let openedNotice = notices.data.filter((notice) => notice.id === +params.id);
		let allTags = [];
		let notice = {};

		if (openedNotice.length) {
			notice = openedNotice[0]
			allTags = notice.tags.map((tag, index) => {
					return (
						<span className="tags bg-info" 
							  key={index}>
							{tag}
						</span>
					)
				}
			)
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
					<div className="row">
						<div className="col-md-8 col-md-offset-2">
							<div className="form-horizontal">
								<div className="form-group">
									<strong className="col-md-2 control-label">Title:</strong>
									<div className="col-md-10">
										<div className="form-control">{notice.title}</div>
									</div>
								</div>
								<div className="form-group">
									<strong className="col-md-2 control-label">Description:</strong>
									<div className="col-md-10">
										<div className="form-control textarea">{notice.description}</div>
									</div>
								</div>
								<div className="form-group">
									<strong className="col-md-2 control-label">Tags:</strong>
									<div className="col-md-10">
										<div className="form-control">
											{allTags}
										</div>
									</div>
								</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NoticePage);
