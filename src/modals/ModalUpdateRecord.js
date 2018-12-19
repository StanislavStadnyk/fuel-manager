import React, { Component } from 'react'

// Constants
import { DATE_FORMAT } from '../constants'

// Day picker
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { formatDate, parseDate } from 'react-day-picker/moment'
import 'react-day-picker/lib/style.css'

// Mui components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'

// Mui icons
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation'
import SwapCallsIcon from '@material-ui/icons/SwapCalls'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import DateRangeIcon from '@material-ui/icons/DateRange'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'

class ModalUpdateRecord extends Component {
	constructor(props) {
		super(props)
		
		this.state = { 
			odometerInputValue: props.item.value.odometer,
			dateInputValue: new Date(props.item.value.date),
			volumeInputValue: props.item.value.volume,
			costInputValue: props.item.value.cost,
			typeSelectValue: props.item.value.type,

			isDateInputNotValid: false,
			isOdometerInputNotValid: false,
			isVolumeInputNotValid: false,
			isCostInputNotValid: false,
			
			disableUpdateRecord: true
		}
	}

	validationBtn = () => {
		const {
      odometerInputValue,
      volumeInputValue,
      costInputValue,
      dateInputValue
	  } = this.state
			  
		if (odometerInputValue && volumeInputValue && costInputValue && dateInputValue) {
			this.setState({
				disableUpdateRecord: false
			})
		} else {
			this.setState({
				disableUpdateRecord: true
			})
		}
	}

	validationField = (evt, isFieldNotValid, fieldValue ) => {
		if (evt.target.value && !isNaN(evt.target.value)) {
			this.setState({ 
				[isFieldNotValid]: false,
				[fieldValue]: evt.target.value,
			}, () => this.validationBtn())
		} else {
			this.setState({ 
				[isFieldNotValid]: true,
				[fieldValue]: '',
			}, () => this.validationBtn())
		}
	}

	updateRecord = (date, odometer, volume, type, cost) => {
		this.props.updateRecordAction({
			'recordId': this.props.item.id,
			'userId': this.props.userId,
			'date': date,
			'odometer': odometer,
			'volume': volume,
			'type': type,
			'cost': cost
		})

		this.handleModalClose()
	}

	handleDayChange = dateInputValue => {
		if (!parseDate(dateInputValue)) {
			this.setState({
				isDateInputNotValid: true,
				dateInputValue: ''
			}, () => this.validationBtn())
		} else {
			this.setState({
				isDateInputNotValid: false,
				dateInputValue: dateInputValue
			}, () => this.validationBtn())
		}
	}

	odometerInputValue = evt => {
		this.validationField(evt, 'isOdometerInputNotValid', 'odometerInputValue')
	}

	volumeInputValue = evt => {
		this.validationField(evt, 'isVolumeInputNotValid', 'volumeInputValue')
	}

	costInputValue = evt => {
		this.validationField(evt, 'isCostInputNotValid', 'costInputValue')
	}

	typeSelectValue = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleModalClose = () => {
		this.props.onModalClose()

		this.setState({
			odometerInputValue: this.props.item.value.odometer,
			dateInputValue: new Date(this.props.item.value.date),
			volumeInputValue: this.props.item.value.volume,
			costInputValue: this.props.item.value.cost,
			typeSelectValue: this.props.item.value.type,

			isDateInputNotValid: false,
			isOdometerInputNotValid: false,
			isVolumeInputNotValid: false,
			isCostInputNotValid: false,
		})
	}

	render() {
		const {
      dateInputValue,
      odometerInputValue,
      typeSelectValue,
      volumeInputValue,
      costInputValue,
      
      isDateInputNotValid,
      isOdometerInputNotValid,
      isVolumeInputNotValid,
      isCostInputNotValid,

      disableUpdateRecord
		} = this.state

		return (
			<div>
				<Dialog
          className='modal-update-record'
          open={this.props.showModal}
          onClose={this.handleModalClose}
          aria-labelledby={this.props.id}
        >
					<DialogTitle id={this.props.id}>Update record</DialogTitle>
					<DialogContent>
						<Grid container spacing={24}>
							{/* Date */}
							<Grid item xs={2}>
								<div className='icon-holder'>
                  <DateRangeIcon />
                </div>
							</Grid>
							<Grid item xs={10}>
								<FormControl className={isDateInputNotValid ? 'form-control error' : 'form-control'}>
									<InputLabel className='form-control-date'>Date</InputLabel>
									<DayPickerInput
                    formatDate={formatDate}
                    format={DATE_FORMAT}
                    parseDate={parseDate}
                    value={dateInputValue}
                    onDayChange={this.handleDayChange}
                    placeholder={DATE_FORMAT}
                    dayPickerProps={{ 
                      selectedDays: dateInputValue,
                      disabledDays: {after: new Date()}
                    }}
                  />
                  {isDateInputNotValid 
                    ? <FormHelperText>Empty or incorrect format</FormHelperText>
                    : null
                  }
								</FormControl>
							</Grid>
							
							{/* Odometer */}
							<Grid item xs={2}>
								<div className='icon-holder'><SwapCallsIcon /></div>
							</Grid>
							<Grid item xs={10}>
								<FormControl
                  className='form-control' 
									error={isOdometerInputNotValid}
                >
									<InputLabel htmlFor='label-odometer'>Odometer</InputLabel>
									<Input
                    id='label-odometer'
										value={odometerInputValue}
										onChange={this.odometerInputValue}
                  />
                  {isOdometerInputNotValid 
                    ? <FormHelperText>Only numbers</FormHelperText>
                    : null
                  }
								</FormControl>
							</Grid>

							{/* Volume & Type */}
							<Grid item xs={2}>
								<div className='icon-holder'>
                  <LocalGasStationIcon />
                </div>
							</Grid>
							<Grid item xs={5}>
								<FormControl
                  className='form-control'
									error={isVolumeInputNotValid}
                >
									<InputLabel htmlFor='label-volume'>Volume</InputLabel>
									<Input
                    id='label-volume'
                    value={volumeInputValue}
                    onChange={this.volumeInputValue}
                  />
                  {isVolumeInputNotValid 
                    ? <FormHelperText>Only numbers</FormHelperText>
                    : null
                  }
								</FormControl>
							</Grid>
							<Grid item xs={5}>
								<FormControl className='form-control'>
									<InputLabel htmlFor='label-type'>Type</InputLabel>
									<Select
                    value={typeSelectValue}
                    onChange={this.typeSelectValue}
                    inputProps={{
                      name: 'typeSelectValue',
                      id: 'label-type',
                    }}
                  >
										<MenuItem value='A-98'>A-98</MenuItem>
										<MenuItem value='A-95'>A-95</MenuItem>
										<MenuItem value='A-92'>A-92</MenuItem>
										<MenuItem value='Diesel'>Diesel</MenuItem>
										<MenuItem value='Gas'>Gas</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							{/* Cost */}
							<Grid item xs={2}>
								<div className='icon-holder'>
                  <AttachMoneyIcon />
                </div>
							</Grid>
							<Grid item xs={10}>
								<FormControl
                  className='form-control'
									error={isCostInputNotValid}
                >
									<InputLabel htmlFor='label-cost'>Cost</InputLabel>
									<Input
                    id='label-cost'
                    value={costInputValue}
                    onChange={this.costInputValue}
                  />
                  {isCostInputNotValid
                    ? <FormHelperText>Only numbers</FormHelperText>
                    : null
                  }
								</FormControl>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
              variant='fab'
              color='primary' 
              mini 
              onClick={this.handleModalClose}
            >
							<ClearIcon />
						</Button>
						<Button
              variant='fab'
              color='secondary' 
              disabled={disableUpdateRecord}
              onClick={() => {
                this.updateRecord(
                  dateInputValue.toJSON(),
                  +odometerInputValue,
                  +volumeInputValue,
                  typeSelectValue,
                  costInputValue,
                )
              }}
						>
							<DoneIcon />
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default ModalUpdateRecord
