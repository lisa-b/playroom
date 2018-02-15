import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Video = styled.video`
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
`;

const OverlayVideo = Video.extend`
	z-index: 100;
`;

class Track extends Component {
	render() {
		//gör att du slipper skriva this.props
		const {
			active,
			baseVideo,
			overlayVideos,
			activeOverlay,
			overlayPlaying,
			handleOverlayEnded,
		} = this.props;

		if (!active) return null;

		return (
			<div>
				{/* mute när overlay visas, hur? */}
				<Video src={baseVideo} autoPlay muted loop />

				{overlayPlaying && (
					<OverlayVideo
						autoPlay
						src={overlayVideos[activeOverlay]}
						onEnded={handleOverlayEnded}
					/>
				)}
			</div>
		);
	}
}

Track.propTypes = {
	active: PropTypes.bool.isRequired,
	baseVideo: PropTypes.string.isRequired,
	overlayVideos: PropTypes.array.isRequired,
	activeOverlay: PropTypes.number.isRequired,
	overlayPlaying: PropTypes.bool.isRequired,
	handleOverlayEnded: PropTypes.func.isRequired,
};

export default Track;
