import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Fullscreen from 'react-full-screen';

import Track1 from './Track1';
import Track2 from './Track2';
import Navigation from './Navigation';

class App extends Component {
	state = { isFull: false };

	goFull = () => {
		this.setState({ isFull: true });
	};

	render() {
		return (
			<Fullscreen
				enabled={this.state.isFull}
				onChange={isFull => this.setState({ isFull })}
			>
				<Router>
					<Fragment>
						<Route path="/" exact component={Navigation} />
						<Route path="/Track1" component={Track1} />
						<Route path="/Track2" component={Track2} />

						<button onClick={this.goFull}>Fullskärm</button>
					</Fragment>
				</Router>
			</Fullscreen>
		);
	}
}

export default App;
