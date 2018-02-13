import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Track1 from './Track1';
import Track2 from './Track2';
import Navigation from './Navigation';

class App extends Component {
	render() {
		return (
			<Router>
				<Fragment>
					<Route path="/" exact component={Navigation} />
					<Route path="/Track1" component={Track1} />
					<Route path="/Track2" component={Track2} />
				</Fragment>
			</Router>
		);
	}
}

export default App;
