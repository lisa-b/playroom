import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Video from './Video';
import video1 from './videos/katt.mp4';

class Track1 extends Component {
	render() {
		return (
			<div>
				<h1>Track1</h1>
				<Video source={video1} />
			</div>
		);
	}
}

export default Track1;
