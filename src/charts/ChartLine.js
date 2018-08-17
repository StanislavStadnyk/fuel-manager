import React, { Component } from 'react';
//import { connect } from 'react-redux';

// Chart
import { AreaChart, Area, ReferenceLine, ResponsiveContainer, LabelList } from 'recharts';

// Utils
//import { sortObjectByParam, odometerDifference } from '../../utils/index';

// Actions
// import * as ApiServiceActionCreators from '../../redux/actions/apiService';
// import { bindActionCreators } from 'redux';

// Mui icons
//import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';

const customizedLabel = (props) => {
    const { x, y, value } = props;
      
    return (
      <g>
        <text x={x-11} y={y-5} fill="#fff">
          {(value/100).toFixed(2)}
        </text>
      </g>
    );
};

// const customizedMaxLabel = (props) => {
//     const { x, y, width } = props.viewBox;

//     console.log(props)
      
//     return (
//       <g>
//         <text x={width/2 - 10} y={y+5} fill="#fff">
//             {/* Max price */}
//         </text>
//       </g>
//     );
// };

class ChartLine extends Component {
    // componentWillMount() {
	// 	const { ApiServiceActionCreators: { getAllRecordsAction },
	// 			authorization: { userId }
	// 		  } = this.props;
	// 	getAllRecordsAction(userId);
	// }

	render () {
        // styles for Chart
        let chartStyle = {
            height: '140px',
            background: '#424242',
            fontSize: '10px',
            margin: '0 -12px'
        }

        // const { records: { dataRecords } } = this.props;

        // // data sorting
        // let arrRecords = sortObjectByParam(dataRecords, 'odometer');

        // // data computation
        // arrRecords = odometerDifference(arrRecords);

        // // data reversing
        // arrRecords.reverse();

        // // restricted number of items, last 9
        // if (arrRecords.length >= 9) {
        //     arrRecords = arrRecords.slice(arrRecords.length - 9, arrRecords.length);
        // }

        // // avarage data
        // let avarage = [];
        // avarage = arrRecords.map((item) => {
        //     let a = {};
        //     if (item.value.difference) {
        //         return { cost: 100 * (item.value.cost * item.value.volume / item.value.difference).toFixed(2)};
                
        //     } else {
        //         return { cost: 100 * (item.value.cost * item.value.volume / item.value.odometer).toFixed(2)};
        //     }
        // })

        // // max item from data
        // let maxCost = Math.max.apply(Math,avarage.map(function(o){return o.cost;}))
        
        // // avarage cost
        // let sum = 0;
        // let avgCost = 0;
        // for (let i = 0; i < avarage.length; i++ ){
        //     sum += avarage[i].cost;
        // }
        // avgCost = parseInt(sum/avarage.length, 10);

        return (
            <div>
                {/* <div className="main-box">
                    <div className="heading">
                        <h2>Travel costs</h2>
                        <span className="avg">
                            <strong>{avgCost/100}</strong>
                            <span>Hrn/Km</span>
                            <LocalGasStationIcon />
                        </span>
                    </div>
                </div> */}
                <div style={chartStyle}>
                    <ResponsiveContainer>
                        <AreaChart data={this.props.data}
                                   margin={{top: 20, right: 14, left: 14, bottom: 0}}>
                            {/* <CartesianGrid strokeDasharray="3 3"/> */}
                            {/* <XAxis dataKey="name"/>
                            <YAxis/> */}
                            {/* <Tooltip/> */}
                            {/* <Legend /> */}
                            <ReferenceLine y={this.props.maxCost} 
                                        //    xAxisId="center" 
                                        //    label={customizedMaxLabel} 
                                           stroke="#f50057" 
                                           strokeDasharray="3 3"/>
                            <ReferenceLine y={this.props.avgCost} 
                                        //    xAxisId="center" 
                                        //    label={customizedMaxLabel} 
                                           stroke="#fff" 
                                           strokeDasharray="3 3"/>
                            <Area type="linear" 
                                  dataKey="cost" 
                                  stroke="#2196f3"
                                  fill='#2196f3'
                                >
                                <LabelList dataKey="cost" 
                                           position="top" 
                                           content={customizedLabel} />
                            </Area>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

// function mapStateToProps(state) {
// 	return {
// 		records: state.recordsState,
// 		authorization: state.authorizationState,
// 	};
// }

// function mapDispatchToProps(dispatch) {
// 	return {
// 		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
// 	};
// }

export default ChartLine;
