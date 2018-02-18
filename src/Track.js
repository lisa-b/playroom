import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Video = styled.video`
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
`;

class Track extends Component {
	render() {
		//gör att du slipper skriva this.props
		const { active, videos, activeVideo, handleVideoEnded } = this.props;

		if (!active) return null;

		return (
			<div>
				<Video
					autoPlay
					src={videos[activeVideo].src}
					onEnded={handleVideoEnded}
					loop={videos[activeVideo].loop ? 'loop' : undefined}
				/>
			</div>
		);
	}
}

Track.propTypes = {
	active: PropTypes.bool.isRequired,
	videos: PropTypes.array.isRequired,
	activeVideo: PropTypes.number.isRequired,
	handleVideoEnded: PropTypes.func.isRequired,
};

export default Track;
