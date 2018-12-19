import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Contants
import { SUB_PATH } from '../constants'

// Icons
import * as FontAwesome from 'react-icons/lib/fa'

// Mui icons
import MenuIcon from '@material-ui/icons/Menu'

// Mui components
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

class Header extends Component {
  constructor(props) {
    super(props)
    
    this.state = { 
      menuLeft: false
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }
  
  render() {
    // authorization true/false
    const { auth } = this.props

    return (
      <div>
        {auth
          ? <AppBar 
              position='fixed'
              id='header'
            >
              <Toolbar className='header-holder'>
                {/* Nav btn */}
                <IconButton 
                  color='inherit' 
                  aria-label='Menu'
                  onClick={this.toggleDrawer('menuLeft', true)}
                >
                  <MenuIcon />
                </IconButton>

                {/* Logo */}
                <h2 className='logo'>
                    <Link to={`${SUB_PATH}/`}>Fuel Manager</Link>
                </h2>

                {/* Btns */}
                <Link to={`${SUB_PATH}/logout`}><FontAwesome.FaSignOut /></Link>
              </Toolbar>
            </AppBar>
          : null
        }

        {/* Sidenav */}
        <Drawer
          open={this.state.menuLeft} 
          onClose={this.toggleDrawer('menuLeft', false)}
        >
          <div
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer('menuLeft', false)}
            onKeyDown={this.toggleDrawer('menuLeft', false)}
          >
            <ul>
                <li><Link to={`${SUB_PATH}/profile`}>Profile</Link></li>
                <li><Link to={`${SUB_PATH}/stations`}>Stations</Link></li>
            </ul>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default Header
