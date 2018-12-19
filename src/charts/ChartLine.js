import React, { Component } from 'react'

// Chart
import { AreaChart, Area, ReferenceLine, ResponsiveContainer, LabelList } from 'recharts'

const customizedLabel = (props) => {
  const { x, y, value } = props

  return (
    <g>
      <text x={x - 11} y={y - 5} fill='#fff'>
        {(value / 100).toFixed(2)}
      </text>
    </g>
  )
}

// const customizedMaxLabel = (props) => {
//     const { x, y, width } = props.viewBox;

//     console.log(props)

//     return (
//       <g>
//         <text x={width/2 - 10} y={y+5} fill='#fff'>
//             {/* Max price */}
//         </text>
//       </g>
//     );
// };

class ChartLine extends Component {
  render () {
    // styles for Chart
    let chartStyle = {
      height: '140px',
      background: '#424242',
      fontSize: '10px',
      margin: '0 -12px'
    }

    return (
      <div style={chartStyle}>
        <ResponsiveContainer>
          <AreaChart
            data={this.props.data}
            margin={{ top: 20, right: 14, left: 14, bottom: 0 }}>
            {/* <CartesianGrid strokeDasharray='3 3'/> */}
            {/* <XAxis dataKey='name'/>
                          <YAxis/> */}
            {/* <Tooltip/> */}
            {/* <Legend /> */}
            <ReferenceLine
              y={this.props.maxCost}
              //    xAxisId='center'
              //    label={customizedMaxLabel}
              stroke='#f50057'
              strokeDasharray='3 3'
            />
            <ReferenceLine
              y={this.props.avgCost}
              //    xAxisId='center'
              //    label={customizedMaxLabel}
              stroke='#fff'
              strokeDasharray='3 3'
            />
            <Area
              type='linear'
              dataKey='cost'
              stroke='#2196f3'
              fill='#2196f3'
            >
              <LabelList
                dataKey='cost'
                position='top'
                content={customizedLabel}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default ChartLine
