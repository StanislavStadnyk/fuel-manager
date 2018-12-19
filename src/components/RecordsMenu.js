import React, { Component } from 'react'

// Mui icons
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

// Mui components
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class RecordsMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			anchorEl: null,
			showModal: false
		}
	}

	handleMenuClick = event => {
		this.setState({ 
			anchorEl: event.currentTarget
		})
	};
	
	handleMenuClose = () => {
		this.setState({ 
			anchorEl: null
		})
	}

	handleMenuCloseDelete = obj => {
		this.setState({ anchorEl: null })
		this.props.deleteRecordAction(obj)
	};

	onBtnUpdateClick = index => {
		this.setState({ anchorEl: null })
		this.props.onBtnUpdateClick(index)
	};

	render() {
		const { anchorEl } = this.state

    return (
			<div>
        <IconButton 
          className='records-btn-menu'
          aria-label='More'
          aria-owns={anchorEl ? `long-menu-${this.props.item.id}` : null}
          aria-haspopup='true'
          onClick={this.handleMenuClick}
        >
					<MoreVertIcon />
				</IconButton>
        <Menu 
          id={`long-menu-${this.props.item.id}`}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
				>
					<MenuItem onClick={() => this.onBtnUpdateClick(this.props.index)}>
						Update
					</MenuItem>
					<MenuItem onClick={() => this.handleMenuCloseDelete({record: this.props.item, userId: this.props.userId})}>
						Delete
					</MenuItem>
				</Menu>
			</div>
		)
	}
}

export default RecordsMenu
