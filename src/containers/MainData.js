import React, { Component } from 'react'
import { connect } from 'react-redux'

// Utils
import moment from 'moment'
import { sortObjectByParam, odometerDifference } from '../utils/index'

// Actions
import * as ApiServiceActionCreators from '../redux/actions/apiService'
import { bindActionCreators } from 'redux'

// Mui icons
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation'

// Custom components
import NoData from '../components/NoData'
import Spinner from '../components/Spinner'

// Modals
import { ModalAddRecord } from '../modals/index'

// Charts
import { ChartLine } from '../charts/index'

// Constants
import { DATE_FORMAT } from '../constants'

class MainData extends Component {
  componentDidMount() {
    const {
      ApiServiceActionCreators: { getAllRecordsAction },
      authorization: { userId }
    } = this.props
    getAllRecordsAction(userId)
  }
  
  // transform data
  transformData = data => {
    let arrRecords = []
    arrRecords = sortObjectByParam(data, 'odometer')
    arrRecords = odometerDifference(arrRecords)
    arrRecords = arrRecords.reverse()
    
    return arrRecords
  }

  // avarageLitersPer100Km data the last one
  avarageLitersPer100KmLast = data => {
    let avarageLitersPer100KmLast = 0

    if (data.length > 1) {
      const vol = data[data.length-2].value.volume
      const distance = data[data.length-1].value.difference

      avarageLitersPer100KmLast = (vol/distance * 100).toFixed(2)
    } else {
      avarageLitersPer100KmLast = 0
    }

    return avarageLitersPer100KmLast
  }

  // number of days between current day and the last refueling
  daysAfterLastRefueling = lastDate => {
    let today = Date.now()
    
    let diff = parseInt((today - lastDate)/(24 * 3600 * 1000), 10)
    if (diff > 1) {
      return (diff + ' - days ago')
    } else {
      return (diff + ' - day ago')
    }
  }

	render () {
    const { records: { dataRecords, loading } } = this.props
    let arrRecords = []
    
    arrRecords = this.transformData(dataRecords)
    // arrRecords = []

    if (loading) {
      return <Spinner/>
    }

    if (!arrRecords.length) {
      return <NoData/>
    }
    
    let lastRecord = arrRecords[arrRecords.length - 1].value
    let lastDate = lastRecord.date
    let lastOdometer = lastRecord.odometer
    let lastVolume = lastRecord.volume
    let lastCost = lastRecord.cost

    // restricted number of items, last 9 only for Chart
    let arrRecordsLimited9 = []
    if (arrRecords.length >= 9) {
      arrRecordsLimited9 = arrRecords.slice(arrRecords.length - 9, arrRecords.length)
    }

    // avarageCostPerKm data
    let avarageCostPerKm = []
    avarageCostPerKm = arrRecordsLimited9.map((item) => {
      if (item.value.difference) {
        return { cost: 100 * (item.value.cost * item.value.volume / item.value.difference).toFixed(2)}
      } else {
        return { cost: 100 * (item.value.cost * item.value.volume / item.value.odometer).toFixed(2)}
      }
    })

    // max item from data
    let maxCost = Math.max.apply(Math,avarageCostPerKm.map(function(o){return o.cost}))
    
    // avarage cost
    let sum = 0
    let avgCost = 0
    for (let i = 0; i < avarageCostPerKm.length; i++ ){
      sum += avarageCostPerKm[i].cost
    }
    avgCost = avarageCostPerKm.length ? parseInt(sum/avarageCostPerKm.length, 10) : ''

    // avarageLitersPer100Km data
    let avarageLitersPer100Km = 0
    for (let i = 0; i < arrRecords.length; i++) {
      if (i < arrRecords.length - 1) {
        avarageLitersPer100Km += (arrRecords[i].value.volume/arrRecords[i+1].value.difference) * 100
      }
    }
    avarageLitersPer100Km = (avarageLitersPer100Km/arrRecords.length).toFixed(2)

    return (
      <div>
        {/* main-box */}
        <div className='main-box'>
          <div className='fuel-columns'>
            <div className='avg-col'>
                <span className='title'>Avarage</span>
                <span className='number'>{avarageLitersPer100Km}</span>
                <span className='result'>L/100Km</span>
            </div>
            <div className='text-col'>
                <h2>fuel consumption</h2>
                <LocalGasStationIcon />
            </div>
            <div className='last-col'>
                <span className='title'>Last</span>
                <span className='number'>{this.avarageLitersPer100KmLast(arrRecords)}</span>
                <span className='result'>L/100Km</span>
            </div>
          </div>
        </div>

        {/* main-box */}
        <div className='main-box'>
            <div className='heading'>
                <h2>AVG. Travel costs</h2>
                <span className='avg'>
                    <strong>{avgCost/100 || ''}</strong>
                    <span>Hrn/Km</span>
                    <LocalGasStationIcon />
                </span>
            </div>

            <ChartLine 
              data={avarageCostPerKm}
              maxCost={maxCost}
              avgCost={avgCost}
            />
        </div>

        {/* main-box */}
        <div className='main-box'>
            <div className='heading'>
                <h2>Last refueling</h2>
            </div>
            <div className='last-refueling'>
              <p>{this.daysAfterLastRefueling(Date.parse(lastDate))}</p>
              <p>
                {moment(lastDate).format(DATE_FORMAT)}
                <span className='text-grey'> - {lastOdometer}Km</span>
              </p>
              <p>
                {lastVolume}L <span className='text-grey'>by </span>
                {lastCost}Hrn/L <span className='text-grey'> - {(lastVolume * lastCost).toFixed(2)}Hrn</span>
              </p>
            </div>
        </div>

        <ModalAddRecord {...this.props} />
      </div>
    )
  }
}

function mapStateToProps(state) {
	return {
		records: state.recordsState,
		authorization: state.authorizationState
	}
}

function mapDispatchToProps(dispatch) {
	return {
		ApiServiceActionCreators: bindActionCreators(ApiServiceActionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainData)
