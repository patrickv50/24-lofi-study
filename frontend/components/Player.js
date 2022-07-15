import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Control from './player/Control'
import Display from './player/Display'
import Misc from './player/Misc'
import Playlist from './player/Playlist'
import {FaPlay} from 'react-icons/fa'

const Player = () => {
    const [userEngaged, setUserEngaged] = useState(false)
    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(60)
    const [activeTrack, setActiveTrack] = useState({
        name: '1. Lofi Hip Hop',
        audio: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    })

    useEffect(() => {
        if (!userEngaged) window.addEventListener("keypress", () => { setUserEngaged(true) })
        return (() => { window.removeEventListener("keypress", () => { 
            setUserEngaged(true) }) 
            setPlay(true)
        })
    }, [userEngaged])

    if (!userEngaged) return (
        <>

            <button className=" absolute bottom-7 left-7 p-5 color-re z-10 bg-yellow-50 leading-1" onClick={() => setUserEngaged(true)}>Press <FaPlay className='inline text-lg text-yellow-700 hover:text-yellow-400' /> Or Any Key To Play</button>
            <Display
                trackName=''
            />
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
            <div style={{ position: 'absolute',maxWidth:'0px', pointerEvents:'none' }}>
                {userEngaged && <ReactPlayer url={activeTrack.audio}
                    style={{ opacity: '0', height: '0', position: 'absolute',maxWidth:'0px', pointerEvents:'none' }}
                    volume={volume / 100}
                    playing={play} />}
            </div>

        </>
    )
}



export default Player

