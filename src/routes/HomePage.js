import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

// Custom components
import Records from '../containers/Records';
import MainData from '../containers/MainData';

// Mui components
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

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
		  activeTab: 0,

		  open: true,
		};
	}

	handleTabChange = (event, activeTab) => {
		this.setState({ activeTab });
	};

	handleClick = () => {
		this.setState({ open: true });
	  };
	
	handleClose = () => {
		const { ApiServiceActionCreators: { refreshDeleteAction }} = this.props;

		refreshDeleteAction();
	};

	render() {
		const { records } = this.props;
		const { activeTab } = this.state;	

		return (
            <div>
				{
					records.error.isError
						? <Snackbar
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							autoHideDuration={5000}
							open={this.state.open}
							onClose={this.handleClose}
							ContentProps={{
								'aria-describedby': 'message-error-request',
							}}
							message={<span id="message-error-request">{records.error.request}</span>}
							/>
						: null
				}

				<AppBar position="static">
					<Tabs value={activeTab} 
						  onChange={this.handleTabChange}>
						<Tab label="Main" />
						<Tab label="Records" />
					</Tabs>
				</AppBar>

				{activeTab === 0 && <TabContainer>
										<div className="grid-container">
											<MainData />
											{/* <ChartLine/> */}
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
