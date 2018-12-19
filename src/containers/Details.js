import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import * as ApiServiceActionCreators from '../redux/actions/apiService'
import { bindActionCreators } from 'redux'

// Utils
import { sortObjectByParam } from '../utils/index'

// Custom components
import NoData from '../components/NoData'
import Spinner from '../components/Spinner'

class Details extends Component {
  componentDidMount = () => {
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

    return arrRecords
  }

  render() {
    const {
      records: { dataRecords, loading }
    } = this.props

    let arrRecords = []

    arrRecords = this.transformData(dataRecords)

    if (loading) {
      return <Spinner />
    }

    if (!arrRecords.length) {
      return <NoData />
    }

    return (
      <div className='main-box'>
        <div className='heading'>
          <h3>Number of records</h3>
        </div>
        <div className='total'>
          <p>Total</p>
          <p>{arrRecords.length}</p>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Details)
