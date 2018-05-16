import React, { Component } from 'react';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

import AutocompleteNotices from './autocompletes/AutocompleteNotices';
import AutocompleteDescriptionTags from './autocompletes/AutocompleteDescriptionTags';

import NoticesInDirectory from './NoticesInDirectory';

import { connect } from 'react-redux';

import * as DirectoriesActionCreators from '../redux/actions/directories';
import * as NoticesActionCreators from '../redux/actions/notices';
import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

const tooltip = (
	<Tooltip id="tooltip">Method of searching</Tooltip>
);

class Directories extends Component {
	constructor(props) {
		super(props)
		this.state = {
			simpleAdvanced: false
		}
	}

	simpleAdvanced = () => {
		const { NoticesActionCreators: {
					advancedSearchAction, 
					simpleSearchAction
				}
			  } = this.props;

		this.setState({
			simpleAdvanced: !this.state.simpleAdvanced
		}, () => this.state.simpleAdvanced ? advancedSearchAction() : simpleSearchAction())
	}
  	render() {
		const { notices } = this.props;

		return (
			<div>
				<div className="clearfix">
					<div className="row">
						<div className="col-sm-10 col-md-12 col-md-offset-0 col-sm-offset-2 form-horizontal">
							<div className="row">
								<label className="control-label col-xs-12 col-sm-4 control-label">
									{this.state.simpleAdvanced 
										? 'Advanced search'
										: 'Simple search'
									}
								</label>
								<div className="col-sm-4 col-xs-6">
									{this.state.simpleAdvanced 
										? <AutocompleteDescriptionTags {...this.props}/>
										: <AutocompleteNotices {...this.props}/>
									}
								</div>
								<div className="pull-left">
									<OverlayTrigger placement="top" 
													overlay={tooltip}>
										<Button bsStyle="primary"
												onClick={this.simpleAdvanced}>
											{this.state.simpleAdvanced 
												? 'to Simple search'
												: 'to Advanced search'
											}
										</Button>
									</OverlayTrigger>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="clearfix">
					<h3>Notices in the current folder</h3>
					<div className="panel panel-default">
						<div className="panel-body">
							{notices.length 
								? <NoticesInDirectory {...this.props}/>
								: <span className="text-danger">The directory is empty</span>
							}
						</div>
					</div>
				</div>
			</div>
		);
  	}
}

function mapStateToProps(state, props) {
	function sortOfPosition(a, b) {
		if (a.position > b.position) return 1;
		if (a.position < b.position) return -1;
	}

	return {
		directories: state.directoriesState,
		notices: state.noticesState.data.filter(item => item.directoryId === +props.params.id).sort(sortOfPosition)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		DirectoriesActionCreators: bindActionCreators(DirectoriesActionCreators, dispatch),
		NoticesActionCreators: bindActionCreators(NoticesActionCreators, dispatch),
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Directories);
