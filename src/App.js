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
import scenBild from './videos/scen/scenBild.png';

import Brandstation from './videos/Brandstation.mp4';
import BrandstationLjud from './videos/BrandstationLjud.mp4';

import Space from './videos/Space.mp4';
import SpaceRocketArriving from './videos/SpaceRocketArriving.mp4';
import SpaceRocketStanding from './videos/SpaceRocketStanding.mp4';
import SpaceRocketLeaving from './videos/SpaceRocketLeaving.mp4';
import spaceBild from './videos/spaceBild.png';

import Searching from './videos/Searching.mp4';
import SearchingBase from './videos/SearchingBase.mp4';
import searchingBild from './videos/searchingBild.png';

import Road1 from './videos/Road1.mp4';
import Road2 from './videos/Road2.mp4';

import dinos from './videos/dinos.mp4';
import DinoArriving from './videos/DinoArriving.mp4';
import DinoStanding from './videos/DinoStanding.mp4';
import DinoLeaving from './videos/DinoLeaving.mp4';
import dinosBild from './videos/dinosBild.png';

import dragon from './videos/dragon.mp4';
import DragonArriving from './videos/DragonArriving.mp4';
import DragonFire from './videos/DragonFire.mp4';
import DragonFireEnding from './videos/DragonFireEnding.mp4';
import dragonBild from './videos/dragonBild.png';

import hastedit from './videos/hastedit.mp4';
import honsedit from './videos/honsedit.mp4';
import hundaredit from './videos/hundaredit.mp4';

import circus from './videos/circus.mp4';
import circusDog from './videos/circusDog.mp4';
import circusDogSitting from './videos/circusDogSitting.mp4';
import circusBild from './videos/circusBild.png';

//structure of videos
const tracks = [
	{
		poster: scenBild,
		videos: [
			{ src: theScen, loop: true },
			{ src: scenDance11, loop: false },
			{ src: scenDance12, loop: true },
			{ src: scenDance13, loop: false },
			{ src: theScen, loop: true },
			{ src: scenPlay11, loop: false },
			{ src: scenPlay12, loop: true },
			{ src: scenPlay13, loop: false },
		],
	},
	{
		poster: circusBild,
		videos: [
			{ src: circus, loop: true },
			{ src: circusDog, loop: false },
			{ src: circusDogSitting, loop: true },
		],
	},
	{
		poster: dragonBild,
		videos: [
			{ src: dragon, loop: true },
			{ src: DragonArriving, loop: false },
			{ src: DragonFire, loop: true },
			{ src: DragonFireEnding, loop: false },
		],
	},
	{
		poster: searchingBild,
		videos: [{ src: SearchingBase, loop: true }, { src: Searching, loop: true }],
	},
	{
		poster: spaceBild,
		videos: [
			{ src: Space, loop: true },
			{ src: SpaceRocketArriving, loop: false },
			{ src: SpaceRocketStanding, loop: true },
			{ src: SpaceRocketLeaving, loop: false },
		],
	},
	{
		poster: dinosBild,
		videos: [
			{ src: dinos, loop: true },
			{ src: DinoArriving, loop: false },
			{ src: DinoStanding, loop: true },
			{ src: DinoLeaving, loop: false },
		],
	},
	{
		poster: '',
		videos: [{ src: Brandstation, loop: true }, { src: BrandstationLjud, loop: true }],
	},
	{
		poster: '',
		videos: [
			{ src: hastedit, loop: true },
			{ src: honsedit, loop: true },
			{ src: hundaredit, loop: true },
		],
	},
	{
		poster: '',
		videos: [{ src: Road2, loop: true }, { src: Road1, loop: true }],
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
			this.nextVideo();
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
						poster={track.poster}
						activeVideo={this.state.activeVideo}
						handleVideoEnded={this.handleVideoEnded}
					/>
				))}
			</Fullscreen>
		);
	}
}

export default App;
