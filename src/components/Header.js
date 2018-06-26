import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Contants
import { SUB_PATH } from '../constants';

// Icons
import * as FontAwesome from 'react-icons/lib/fa';

// Mui
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {
    constructor(props) {
		super(props);
		
		this.state = { 
            menuLeft: false
		};
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };
    
    render() {
        // authorization true/false
        const { auth } = this.props;

		return (
            <div>
                <AppBar position="fixed"
                        id="header">
                    <Toolbar className="header-holder">
                        {/* Nav btn */}
                        {auth
                            ? <IconButton color="inherit" 
                                        aria-label="Menu"
                                        onClick={this.toggleDrawer("menuLeft", true)}>
                                <MenuIcon />
                            </IconButton>
                            : null
                        }

                        {/* Logo */}
                        <Typography className="logo"
                                    variant="title">
                            <Link to={`${SUB_PATH}/`}>Fuel Manager</Link>
                        </Typography>

                        {/* Btns */}
                        {auth
                            ? <Link to={`${SUB_PATH}/logout`}><FontAwesome.FaSignOut /></Link>
                            : null//<Link to={`${SUB_PATH}/login`}>Register/Login</Link>
                        }
                    </Toolbar>
                </AppBar>

                {/* Sidenav */}
                <Drawer open={this.state.menuLeft} 
                        onClose={this.toggleDrawer('menuLeft', false)}>
                    <div
                        tabIndex={0}
                        role="button"
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
		);
  }
}

export default Header;