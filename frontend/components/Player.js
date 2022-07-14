import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Control from './player/Control'
import Display from './player/Display'
import Misc from './player/Misc'
import Playlist from './player/Playlist'


const Player = () => {
    const [userEngaged, setUserEngaged] = useState(false)
    const [play, setPlay] = useState(true)
    const [volume, setVolume] = useState(100)
    const [activeTrack, setActiveTrack] = useState({
        name: '1. Chill hop',
        audio: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
    })

    if (!userEngaged) return (
        <>
            <Display
                trackName=""
            />
            <button className="absolute top-0 color-re z-10 bg-slate-200" onClick={() => setUserEngaged(true)}>Press Any Key To Play</button>
        </>
    )
    else return (
        <>
            <Display
                trackName={activeTrack.name}
            />
            <Control
                play={play}
                setPlay={setPlay}
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
                volume={volume}
                setVolume={setVolume}
            />
            <Playlist
                setActiveTrack={setActiveTrack}
            />

            <Misc />
            <div style={{ position: 'absolute' }}>
                {play && <ReactPlayer url={activeTrack.audio}
                    style={{ opacity: '0', height: '0', position: 'absolute' }}
                    volume={volume / 100}
                    playing={true} />}
            </div>

        </>
    )
}



export default Player

