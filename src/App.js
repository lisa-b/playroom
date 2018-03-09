import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import { injectGlobal } from 'styled-components';

import Track from './Track';

// import films

import cafe from './videos/cafe.mp4';
import cafeFade from './videos/cafeFade.mp4';
import cafeImage from './videos/cafeImage.png';

import desertVideo from './videos/desertVideo.mp4';
import desertFade from './videos/desertFade.mp4';
import desertImage from './videos/desertImage.png';

import fairytale from './videos/fairytale.mp4';
import fairytaleFade from './videos/fairytaleFade.mp4';
import fairytaleImage from './videos/fairytaleImage.png';

import space from './videos/space.mp4';
import spaceFade from './videos/spaceFade.mp4';
import spaceImage from './videos/spaceImage.png';

import pscy from './videos/pscy.mp4';
import pschy1 from './videos/pschy1.mp4';
import pschy2 from './videos/pschy2.mp4';

import portalImage from './videos/portalImage.png';

//structure of videos
const tracks = [
	{
		videos: [
			{ src: pscy, loop: false, poster: portalImage },
			{ src: fairytaleFade, loop: false, poster: portalImage },
			{ src: fairytale, loop: true, poster: fairytaleImage },
		],
		videos: [
			{ src: pschy1, loop: false, poster: portalImage },
			{ src: desertFade, loop: false, poster: portalImage },
			{ src: desertVideo, loop: true, poster: desertImage },
		],
		videos: [
			{ src: pschy2, loop: false, poster: portalImage },
			{ src: spaceFade, loop: false, poster: portalImage },
			{ src: space, loop: true, poster: spaceImage },
		],
		videos: [
			{ src: pscy, loop: false, poster: portalImage },
			{ src: cafeFade, loop: false, poster: portalImage },
			{ src: cafe, loop: true, poster: cafeImage },
		],
	},
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
			this.setState(state => {
				let newTrack = state.activeTrack - 1;
				if (newTrack < 0) {
					newTrack = tracks.length - 1;
				}

				return {
					activeTrack: newTrack,
					activeVideo: tracks[newTrack].videos.length - 1,
				};
			});
		} else if (event.key === 'f') {
			this.goFull();
		}
	};

	// Play next video when video ends (looped videos will never end and call this)
	handleVideoEnded = () => this.nextVideo();

	nextVideo = () =>
		this.setState(state => ({
			activeVideo: ++state.activeVideo % tracks[state.activeTrack].videos.length,
		}));

	render() {
		return (
			<Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
				{/*create track components for each video-enviroments*/}
				{tracks.map((track, index) => (
					<Track
						key={index}
						active={this.state.activeTrack === index}
						videos={track.videos}
						activeVideo={this.state.activeVideo}
						handleVideoEnded={this.handleVideoEnded}
					/>
				))}
			</Fullscreen>
		);
	}
}

export default App;
