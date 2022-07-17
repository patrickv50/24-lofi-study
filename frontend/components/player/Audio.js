import React from 'react'
import ReactPlayer from 'react-player/youtube'

const Audio = ({ activeTrack, volume, play }) => {
    return (
        <ReactPlayer url={activeTrack.audio}
            style={{ opacity: '0', height: '0', position: 'absolute', maxWidth: '0px', pointerEvents: 'none' }}
            volume={volume / 100}
            playing={play} />
    )
}

export default Audio