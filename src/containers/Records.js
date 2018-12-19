import React, { Component } from 'react'
import { connect } from 'react-redux'

// Utils
import moment from 'moment'
import { sortObjectByParam, odometerDifference} from '../utils/index'

// Actions
import * as ApiServiceActionCreators from '../redux/actions/apiService'
import { bindActionCreators } from 'redux'

// Custom components
import RecordsMenu from '../components/RecordsMenu'
import NoData from '../components/NoData'

// Modals
import { ModalAddRecord, ModalUpdateRecord } from '../modals/index'

// Mui icons
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation'

class Records extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showModal: false,
			modalId: null
		}
	}

	componentDidMount() {
		const {
      ApiServiceActionCreators: { getAllRecordsAction },
			authorization: { userId }
		} = this.props
		getAllRecordsAction(userId)
	}

	handleModalOpen = (index) => {
		this.setState({ 
			showModal: true,
			modalId: index
		})
	}

	handleModalClose = () => {
		this.setState({ 
			showModal: false
		})
	}

	render() {
		const {
      records: { dataRecords },
      authorization: { userId },
      ApiServiceActionCreators: {
        deleteRecordAction,
        updateRecordAction
      }
		} = this.props

		let arrRecords = sortObjectByParam(dataRecords, 'odometer')

		// adding of a difference property for each record
		arrRecords = odometerDifference(arrRecords)

		let recordsList = arrRecords.map((item, index) => {
		let date = moment(item.value.date).format('DD.MM.YYYY')
			
    return (
      <div 
        className="records-item"
        key={index}
      >
        <div className="records-holder">
          <div className="records-frame">
            <div className="records-col-1">
              <LocalGasStationIcon className="records-icon-station" /> <br/>
              {item.value.type}
            </div>
            <div className="records-col-2">
              <strong>{date}</strong> <br/>
              <span className="records-sub-text">{item.value.cost} Hrn/L </span><br/>
              
              <span className="records-sub-text">
                {item.value.difference === 0 
                  ? ((item.value.cost*item.value.volume)/item.value.odometer).toFixed(2)
                  : ((item.value.cost*item.value.volume)/item.value.difference).toFixed(2) 
                }
                &nbsp;Hrn/Km
              </span>
            </div>
            <div className="records-col-3">
              {item.value.odometer} <span className="records-sub-text">(+{item.value.difference})</span> Km <br/>
              <span className="records-sub-text">{item.value.cost*item.value.volume} Hrn <br/>
              {item.value.volume} L<br/></span>
            </div>
          </div>
        
          <RecordsMenu
            item={item}
            index={index}
            userId={userId} 
            deleteRecordAction={deleteRecordAction}
            onBtnUpdateClick={this.handleModalOpen}
          />
        </div>

        {this.state.modalId === index 
          ? <ModalUpdateRecord
              onModalClose={this.handleModalClose} 
              showModal={this.state.showModal}
              updateRecordAction={updateRecordAction}
              item={item}
              userId={userId}
            />
          : null
        }
      </div>
		)
	})

	  return (
      <div>
        {arrRecords.length 
          ? <div className="records-list">
              {recordsList}
            </div>
          : <NoData/>
        }

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

export default connect(mapStateToProps, mapDispatchToProps)(Records)
