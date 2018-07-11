import React, { Component } from 'react';
import { connect } from 'react-redux';

// Utils
import { sortObjectByParam, odometerDifference } from '../utils/index';

// Actions
import * as ApiServiceActionCreators from '../redux/actions/apiService';
import { bindActionCreators } from 'redux';

// Mui icons
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';

// Components
import { ChartLine } from './charts/index';

class MainData extends Component {
    componentWillMount() {
		const { ApiServiceActionCreators: { getAllRecordsAction },
				authorization: { userId }
			  } = this.props;
		getAllRecordsAction(userId);
	}

	render () {
        const { records: { dataRecords } } = this.props;

        // data sorting
        let arrRecords = sortObjectByParam(dataRecords, 'odometer');

        // data computation
        arrRecords = odometerDifference(arrRecords);

        // data reversing
        arrRecords.reverse();

        // restricted number of items, last 9
        if (arrRecords.length >= 9) {
            arrRecords = arrRecords.slice(arrRecords.length - 9, arrRecords.length);
        }

        // avarage data
        let avarage = [];
        avarage = arrRecords.map((item) => {
            let a = {};
            if (item.value.difference) {
                return { cost: 100 * (item.value.cost * item.value.volume / item.value.difference).toFixed(2)};
                
            } else {
                return { cost: 100 * (item.value.cost * item.value.volume / item.value.odometer).toFixed(2)};
            }
        })

        // max item from data
        let maxCost = Math.max.apply(Math,avarage.map(function(o){return o.cost;}))
        
        // avarage cost
        let sum = 0;
        let avgCost = 0;
        for (let i = 0; i < avarage.length; i++ ){
            sum += avarage[i].cost;
        }
        avgCost = parseInt(sum/avarage.length, 10);

        console.log(avarage, sum);

        return (
            <div>
                <div className="main-box">
                    <div className="heading">
                        <h2>Travel costs</h2>
                        <span className="avg">
                            <strong>{avgCost/100 || ""}</strong>
                            <span>Hrn/Km</span>
                            <LocalGasStationIcon />
                        </span>
                    </div>

                    <ChartLine data={avarage}
                               maxCost={maxCost}
                               avgCost={avgCost}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		records: state.recordsState,
		authorization: state.authorizationState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainData);
