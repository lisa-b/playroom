import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

const Video = styled.video`
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

class Track extends Component {
	render() {
		//gör att du slipper skriva this.props
		const { active, videos, activeVideo, handleVideoEnded } = this.props;

		if (!active) return null;

		return (
			<Container>
				<Video
					poster={videos[activeVideo].poster}
					autoPlay
					src={videos[activeVideo].src}
					onEnded={handleVideoEnded}
					loop={videos[activeVideo].loop ? 'loop' : undefined}
				/>
			</Container>
		);
	}
}

Track.propTypes = {
	active: PropTypes.bool.isRequired,
	videos: PropTypes.array.isRequired,
	poster: PropTypes.string.isRequired,
	activeVideo: PropTypes.number.isRequired,
	handleVideoEnded: PropTypes.func.isRequired,
};

export default Track;
