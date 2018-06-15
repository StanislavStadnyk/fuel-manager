import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ApiServiceActionCreators from '../../redux/actions/apiService';
import { bindActionCreators } from 'redux';

// Content
import Records from '../Records';
import { ChartLine } from '../charts/index';

// Material
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
	return (
		<Typography component="div">
			{props.children}
		</Typography>
	);
  }
  
// start HomePage
class HomePage extends Component {
	constructor(props, context) {
		super(props, context);
	
		this.state = {
		  data: [],
		  typeInputValue: '',
		  distanceInputValue: '',
		  activeTab: 1
		};
	}

	handleTabChange = (event, activeTab) => {
		this.setState({ activeTab });
	};

	render() {
		const { records } = this.props;
		const { activeTab } = this.state;		

		return (
            <div>
				{
					records.error.isError
						? <AppBar position="static" 
								  style={{ padding: 20, marginBottom: 20 }}>
							<h4>{records.error.request}</h4>
						   </AppBar>
						: null
				}

				<AppBar position="static">
					<Tabs value={activeTab} 
						  onChange={this.handleTabChange}>
						<Tab label="Item One" />
						<Tab label="Item Two" />
					</Tabs>
				</AppBar>

				{activeTab === 0 && <TabContainer>
										<div className="grid-container">
											Main
											<ChartLine/>
										</div>
									</TabContainer>}
				{activeTab === 1 && <TabContainer>
										<div className="grid-container">
											<Records/>
										</div>
									</TabContainer>}
            </div>
		);
	}
}
// end HomePage

function mapStateToProps(state) {
	return {
		records: state.recordsState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
