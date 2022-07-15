import { useEffect, useRef, useState } from "react"
import { GoTriangleDown } from 'react-icons/go'
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
    name: 'Jazz Lofi',
    audio: 'https://www.youtube.com/watch?v=kgx4WGK0oNU'
}, {
    name: 'Ghibli Lofi',
    audio: 'https://www.youtube.com/watch?v=LMTGQqUUyzk'
}]
const Playlist = ({ setActiveTrack }) => {
    const [listOpen, setListOpen] = useState(false)

    const handleTrackChange = (station) => {
        setActiveTrack(station)
    }

    return (
        <>
            <div className="absolute top-0 h-full w-full z-10 p-1 rounded " onClick={(e) => setListOpen(false)} >
                {/* OPEN/CLOSE BUTTON HERE ========= */}
                <button className="flex flex-col items-center mt-5 p-0 ml-5 z-20 min-w-[40px] text-[1.7rem] font-semibold text-yellow-700 rounded aspect-square bg-yellow-200  relative" onClick={(e) => {
                    e.stopPropagation()
                    setListOpen(state => !state)
                }} >
                    <span >1.</span>
                    <GoTriangleDown className="flex-grow-0 absolute text-yellow-400 top-[80%] h-[50px] duration-200" style={{ transform: `rotate(${listOpen ? "180deg" : "0deg"})` }} />
                </button>
                {/* END OF BUTTON ============ */}
                {/* SONG LIST HERE ============ */}
                <div className="max-w-lg p-3 bg-yellow-50 rounded-xl bg-opacity-90  transition duration-200 mt-10 ml-5 relative z-2000" style={{ opacity: `${listOpen ? '1 ' : '0'}` }}>
                    <ul className="flex flex-col max-h-[200px] overflow-y-auto" onScroll={(e) => e.stopPropagation()}>
                        {radioStations.map((station, index) => (
                            <Card key={index} index={index} station={station} handleTrackChange={handleTrackChange} />
                        ))}
                    </ul>
                </div>
                {/* END OF SONG LIST ============ */}
            </div>
        </>
    )
}

const Card = ({ index, station, handleTrackChange }) => {
    const card = useRef()
    useEffect(() => {
        card.current.classList.add('test')
    }, [])
    return (
        <li className="py-1 ">
            <button ref={card} className="duration-75 " value={station} onClick={(e) => {
                // e.stopPropagation()
                handleTrackChange(station)
            }}>
                <span className="bg-yellow-400 text-yellow-900 p-1 mr-1 text-lg font-semibold inline-block min-w-[40px]">0{index + 1}</span>
                <span>{station.name}</span>
            </button>
        </li>
    )
}
export default Playlist