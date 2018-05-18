import React, { Component } from 'react';
import { Link } from 'react-router';
import { SUB_PATH } from '../constants';

class Header extends Component {
  render() {
		return (
            <header>
                <h1><Link to={`${SUB_PATH}/`}>Fuel Manager</Link></h1>
                <ul className="nav nav-tabs mb-15">
                    <li><Link to={`${SUB_PATH}/profile`}>Profile</Link></li>
                    <li><Link to={`${SUB_PATH}/stations`}>Stations</Link></li>
                </ul>
            </header>
		);
  }
}

export default Header;