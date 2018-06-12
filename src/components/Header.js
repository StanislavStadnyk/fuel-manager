import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SUB_PATH } from '../constants';


import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
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
            <header>
                <AppBar position="static">
                    <Toolbar>
                        {/* Nav btn */}
                        {auth
                            ? <IconButton color="inherit" 
                                        aria-label="Menu"
                                        onClick={this.toggleDrawer('menuLeft', true)}>
                                <MenuIcon />
                            </IconButton>
                            : null
                        }

                        {/* Logo */}
                        <Typography variant="title" color="inherit">
                            <Link to={`${SUB_PATH}/`} style={{ color: '#fff' }}>Fuel Manager</Link>
                        </Typography>

                        {/* Btns */}
                        {auth
                            ? <Link to={`${SUB_PATH}/logout`} style={{ color: '#fff' }}>Logout</Link>
                            : <Link to={`${SUB_PATH}/login`} style={{ color: '#fff' }}>Register/Login</Link>
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
            </header>
		);
  }
}

export default Header;