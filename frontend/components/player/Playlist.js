import { useState } from "react"

const radioStations = [{
    name: '1. Chill hop',
    video: 'https://www.youtube.com/embed/DKBcDzAvbXU?autoplay=1&start=2',
    audio: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
}, {
    name: '2. Tokyo Dreaming',
    video: 'https://www.youtube.com/embed/EC24rvm5Awk?autoplay=1&start=0',
    audio: 'https://www.youtube.com/embed/EC24rvm5Awk?autoplay=1&start=0',
}, {
    name: '3. Chill hop',
    video: 'https://www.youtube.com/watch?v=OyyD0QKxTU4',
    audio: 'https://www.youtube.com/watch?v=7NOSDKb0HlU&ab_channel=ChillhopMusic'
}, {
    name: '4. Lofi Jazz',
    video: 'https://www.youtube.com/watch?v=bz5q5gl2uZA',
    audio: 'https://www.youtube.com/watch?v=bz5q5gl2uZA'
}, {
    name: '5. Ghibli Hop',
    video: 'https://www.youtube.com/watch?v=enKgUEFq0J4',
    audio: 'https://www.youtube.com/watch?v=LMTGQqUUyzk'
}]
const Playlist = ({ setActiveTrack }) => {
    const [listOpen, setListOpen] = useState(false)
    const handleTrackChange = (station) => {
        setActiveTrack(station)
    }
    if (!listOpen) return (
        <button className="absolute top-7 right-7 z-10 bg-yellow-50 p-1 rounded" onClick={() => setListOpen(state => !state)}>List</button>
    )
    else return (
        <div className="absolute top-7 right-7 z-10 bg-yellow-50 p-1 rounded">
            <h1>Playlist</h1>
            <button onClick={() => setListOpen(state => !state)}>List</button>

            <ul>
                {radioStations.map((station, index) => (
                    <li key={index}><button value={station} onClick={() => handleTrackChange(station)}>{station.name}</button></li>

                ))}
            </ul>
        </div>
    )
}

export default Playlist