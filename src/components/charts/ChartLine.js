import React, { Component } from 'react';
import { AreaChart, Area, ReferenceLine, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const customizedLabel = (props) => {
    const { x, y, value } = props;
      
    return (
      <g>
        <text x={x} y={y-10} fill="#fff" textAnchor="middle" dominantBaseline="middle">
          {value}
        </text>
      </g>
    );
};

const customizedMaxLabel = (props) => {
    const { x, y, width } = props.viewBox;

    console.log(props)
      
    return (
      <g>
        <text x={width/2} y={y+5} fill="#fff">
            Max price
        </text>
      </g>
    );
};

class ChartLine extends Component {
    // componentDidMount() {
	// 	const { ApiServiceActionCreators: { getAllRecordsAction },
	// 			authorization: { userId }
	// 		  } = this.props;
	// 	console.log('getAllRecordsAction', this.props);
	// 	getAllRecordsAction(userId);
	// }

	render () {
        let chartStyle = {
            height: '300px'
        }

        console.log('ChartLine', this.props);

        return (
            <div style={chartStyle}>
                <ResponsiveContainer>
                    <AreaChart data={data}
                               margin={{top: 20, right: 20, left: 20, bottom: 10}}>
                        {/* <CartesianGrid strokeDasharray="3 3"/> */}
                        {/* <XAxis dataKey="name"/>
                        <YAxis/> */}
                        <Tooltip/>
                        {/* <Legend /> */}
                        <ReferenceLine y={9800} xAxisId="center" label={customizedMaxLabel} stroke="red"/>
                        <Area type="linear" 
                              dataKey="pv" 
                              stroke="#8884d8">
                            <LabelList dataKey="pv" position="top" content={customizedLabel} />
                        </Area>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
};

export default ChartLine;
