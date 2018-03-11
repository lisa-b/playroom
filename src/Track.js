import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
`;

const Video = styled.video`
	object-fit: cover;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: ${p => (p.when ? '10' : '0')};
`;

class Track extends Component {
	video = [];

	componentDidUpdate(prevProps, prevState) {
		if (this.video[prevProps.activeVideo]) {
			this.video[prevProps.activeVideo].pause();
		}
		if (this.video[this.props.activeVideo]) {
			this.video[this.props.activeVideo].play();
		}
	}
	render() {
		//gör att du slipper skriva this.props
		const { active, videos, activeVideo, handleVideoEnded } = this.props;

		if (!active) return null;

		return (
			<Container>
				{videos.map((video, index) => (
					<Video
						innerRef={comp => (this.video[index] = comp)}
						key={index}
						when={activeVideo === index}
						muted={activeVideo !== index}
						poster={video.poster}
						src={video.src}
						onEnded={handleVideoEnded}
						loop={video.loop ? 'loop' : undefined}
					/>
				))}
			</Container>
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
