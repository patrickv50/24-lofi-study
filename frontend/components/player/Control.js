import { useEffect, useState } from "react"

const radioStations = [{
    name: '1. Chill hop',
    audio: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
}, {
    name: '2. Tokyo Dreaming',
    audio: 'https://www.youtube.com/embed/EC24rvm5Awk?autoplay=1&start=0',
}, {
    name: '3. Chill hop',
    audio: 'https://www.youtube.com/watch?v=7NOSDKb0HlU&ab_channel=ChillhopMusic'
}, {
    name: '4. Lofi Jazz',
    audio: 'https://www.youtube.com/watch?v=bz5q5gl2uZA'
}, {
    name: '5. Ghibli Hop',
    audio: 'https://www.youtube.com/watch?v=LMTGQqUUyzk'
}]
const Control = ({ play, setPlay, activeTrack, setActiveTrack, volume, setVolume }) => {
    const [activeTrackNum, setActiveTrackNum] = useState(0)
    const [targetVolume, setTargetVolume] = useState(volume)

    const handleTrackChange = (e) => {
        if (e.target.value === "next") {
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
    useEffect(() => {
        // console.log(activeTrackNum)
        setActiveTrack(radioStations[activeTrackNum])
    }, [activeTrackNum])

    const delay = async () => {
        console.log(volume)
        await new Promise(resolve => setTimeout(resolve, (10/ (Math.abs(volume - targetVolume))) ))
        if (volume > targetVolume) {
            setVolume(state => Math.floor(state - 1))
        }
        else {
            setVolume(state => Math.floor(state + 1))
        }
    }
    useEffect(() => {
        if (volume !== targetVolume) {
            delay()
        }
    }, [targetVolume, volume])

    return (
        <div className="absolute bottom-7 left-7 z-10 opacity-90 font-semibold text-yellow-50 ">
            <button className="rounded  p-1 min-w-[50px] uppercase drop-shadow-xl shadow-black" onClick={() => setPlay(!play)}>{play ? 'pause' : 'play'}</button>
            <button className="rounded p-1 uppercase drop-shadow-xl shadow-black" value="prev" onClick={handleTrackChange}>prev</button>
            <button className="rounded  p-1 uppercase drop-shadow-xl shadow-black" value="next" onClick={handleTrackChange}>next</button>
            <div className="flex gap-1">
                <h1 className="min-w-[30px] text-center bg-white-600 drop-shadow-xl shadow-black">{volume}</h1>

                {[...Array(10).keys()].map(vol => (
                    <button key={vol} className="bg-yellow-50 min-w-[20px] aspect-square drop-shadow-xl shadow-black" style={{ opacity: `${((vol + 1) * 10-5) <= volume ? '1' : '.2'}` }} value={(vol + 1) * 10} onClick={handleVolumeChange}></button>
                ))}
            </div>
        </div>
    )
}

export default Control