import { useEffect, useState } from "react"
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa'

const radioStations = [{
    name: 'Lofi Hip Hop',
    audio: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
}, {
    name: 'Anime Lofi',
    audio: 'https://www.youtube.com/watch?v=WDXPJWIgX-o',
}, {
    name: 'Chill Hop',
    audio: 'https://www.youtube.com/watch?v=7NOSDKb0HlU&ab_channel=ChillhopMusic'
}, {
    name: 'Lofi Jazz',
    audio: 'https://www.youtube.com/watch?v=kgx4WGK0oNU'
}, {
    name: 'Ghibli',
    audio: 'https://www.youtube.com/watch?v=LMTGQqUUyzk'
}]
const Control = ({ play, setPlay, activeTrack, setActiveTrack, volume, setVolume }) => {
    const [activeTrackNum, setActiveTrackNum] = useState(0)
    const [targetVolume, setTargetVolume] = useState(volume)

    const handleTrackChange = (action) => {
        if (action === "next") {
            setActiveTrackNum(state => {
                return (state + 1) % radioStations.length
            })
        }
        else setActiveTrackNum(state => {
            console.log(((state - 1) + radioStations.length) % radioStations.length)
            return (((state - 1) + radioStations.length) % radioStations.length)
        })
    }

    const handleVolumeChange = (e) => {
        setTargetVolume(Number(e.target.value))
    }

    const delay = async () => {
        console.log(volume)
        await new Promise(resolve => setTimeout(resolve, (10 / (Math.abs(volume - targetVolume)))))
        if (volume > targetVolume) {
            setVolume(state => Math.floor(state - 1))
        }
        else {
            setVolume(state => Math.floor(state + 1))
        }
    }
    useEffect(() => {
        // console.log(activeTrackNum)
        setActiveTrack(radioStations[activeTrackNum])
    }, [activeTrackNum])

    useEffect(() => {
        if (volume !== targetVolume) {
            delay()
        }
    }, [targetVolume, volume])

    return (
            <div className="absolute bottom-7 left-7 z-[50] opacity-90 font-semibold text-yellow-50 border">
            <button className=" p-1 min-w-[30px] text-center   text-[1.3rem]  mr-3" onClick={() => setPlay(!play)}>{play ? <FaPause /> : <FaPlay />}</button>
            <button className="p-1 text-[1.3rem] mr-3" onClick={() => handleTrackChange('prev')}><FaBackward /></button>
            <button className=" p-1  text-[1.3rem] mr-3" onClick={() => handleTrackChange('next')}><FaForward /></button>
            <div className="flex gap-1 mt-1 items-center">
                <h1 className="min-w-[30px] text-center bg-white-600  shadow-black">{volume}</h1>

                {[...Array(10).keys()].map(vol => (
                    <button key={vol} className="bg-yellow-50 min-w-[15px] aspect-square shadow-black" style={{ opacity: `${((vol + 1) * 10 - 5) <= volume ? '1' : '.2'}` }} value={(vol + 1) * 10} onClick={handleVolumeChange}></button>
                ))}
            </div>
        </div>
    )
}

export default Control