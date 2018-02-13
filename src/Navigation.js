import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
	render() {
		return (
			<div>
				<h1>Track1</h1>
				<Link to="/Track1">Track1</Link>
				<Link to="/Track2">Track2</Link>
			</div>
		);
	}
}

export default Navigation;
