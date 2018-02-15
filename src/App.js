import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import { injectGlobal } from 'styled-components';

import Track from './Track';

// import films
import MartinBakgrund from './videos/MartinBakgrund.mp4';
import MartinGris from './videos/MartinGris.mp4';
import MartinTraktor from './videos/MartinTraktor.mp4';

//structure of videos
const videos = [
	{ baseVideo: MartinBakgrund, overlayVideos: [MartinGris, MartinTraktor] },
];

class App extends Component {
	//initiate App state
	state = {
		isFull: false,
		activeTrack: 0,
		activeOverlay: -1,
		overlayPlaying: false,
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
				activeTrack: ++state.activeTrack % videos.length,
				activeOverlay: 0,
				overlayPlaying: false,
			}));
		} else if (event.key === 's') {
			this.setState(state => ({
				activeOverlay:
					++state.activeOverlay %
					videos[state.activeTrack].overlayVideos.length,
				overlayPlaying: true,
			}));
		} else if (event.key === 'f') {
			this.goFull();
		}
	};

	handleOverlayEnded = overlay => this.setState({ overlayPlaying: false });

	render() {
		return (
			<Fullscreen
				enabled={this.state.isFull}
				onChange={isFull => this.setState({ isFull })}
			>
				{/*create track components for each video-enviroments*/}
				{videos.map((video, index) => (
					<Track
						key={index}
						active={this.state.activeTrack === index}
						baseVideo={video.baseVideo}
						overlayVideos={video.overlayVideos}
						activeOverlay={this.state.activeOverlay}
						overlayPlaying={this.state.overlayPlaying}
						handleOverlayEnded={this.handleOverlayEnded}
					/>
				))}
			</Fullscreen>
		);
	}
}

export default App;
