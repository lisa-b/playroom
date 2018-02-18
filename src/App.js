import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import { injectGlobal } from 'styled-components';

import Track from './Track';

// import films
import MartinBakgrund from './videos/MartinBakgrund.mp4';
import MartinGris from './videos/MartinGris.mp4';
import MartinTraktor from './videos/MartinTraktor.mp4';

import theScen from './videos/scen/the-scen.mp4';
import scenDance11 from './videos/scen/scen-dance1_1.mp4';
import scenDance12 from './videos/scen/scen-dance1_2.mp4';
import scenDance13 from './videos/scen/scen-dance1_3.mp4';
import scenPlay11 from './videos/scen/scen-play1_1.mp4';
import scenPlay12 from './videos/scen/scen-play1_2.mp4';
import scenPlay13 from './videos/scen/scen-play1_3.mp4';

//structure of videos
const tracks = [
	[
		{ src: MartinBakgrund, loop: true },
		{ src: MartinGris, loop: false },
		{ src: MartinBakgrund, loop: true },
		{ src: MartinTraktor, loop: false },
	],
	[
		{ src: theScen, loop: true },
		{ src: scenDance11, loop: false },
		{ src: scenDance12, loop: true },
		{ src: scenDance13, loop: false },
		{ src: theScen, loop: true },
		{ src: scenPlay11, loop: false },
		{ src: scenPlay12, loop: true },
		{ src: scenPlay13, loop: false },
	],
];

class App extends Component {
	//initiate App state
	state = {
		isFull: false,
		activeTrack: 0,
		activeVideo: 0,
	};

	componentDidMount() {
		injectGlobal`
			body {
				margin: 0;
				height: 100vh;
				width: 100vw;
				color: black;
			}
		`;

		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	//go to fullscreen function
	goFull = () => {
		this.setState({ isFull: true });
	};

	handleKeyDown = event => {
		if (event.key === 'a') {
			this.setState(state => ({
				activeTrack: ++state.activeTrack % tracks.length,
				activeVideo: 0,
			}));
		} else if (event.key === 's') {
			this.nextVideo();
		} else if (event.key === 'f') {
			this.goFull();
		}
	};

	// Play next video when video ends (looped videos will never end and call this)
	handleVideoEnded = () => this.nextVideo();

	nextVideo = () =>
		this.setState(state => ({
			activeVideo: ++state.activeVideo % tracks[state.activeTrack].length,
		}));

	render() {
		return (
			<Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
				{/*create track components for each video-enviroments*/}
				{tracks.map((videos, index) => (
					<Track
						key={index}
						active={this.state.activeTrack === index}
						videos={videos}
						activeVideo={this.state.activeVideo}
						handleVideoEnded={this.handleVideoEnded}
					/>
				))}
			</Fullscreen>
		);
	}
}

export default App;
