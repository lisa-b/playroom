import React, { Component, Fragment } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

class VideoComp extends Component {
	render() {
		return (
			<Video autoPlay loop muted controls={[]}>
				<source src={this.props.source} type="video/mp4" />
			</Video>
		);
	}
}

export default VideoComp;
