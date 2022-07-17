import { useEffect, useRef, useState } from "react"
import { FaMusic } from "react-icons/fa"
import { GoTriangleDown } from 'react-icons/go'
import useFadeIn from '../hooks/useFadeIn'

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
}, {
    name: 'Odesza',
    audio: 'https://www.youtube.com/watch?v=hX1Mff4XrUA&t=692s'
}]
const Playlist = ({ setActiveTrack }) => {
    const [listOpen, setListOpen] = useState(false)

    const handleTrackChange = (station) => {
        setActiveTrack(station)
    }
    const [visible] = useFadeIn()

    return (
        <>
            <div className="absolute top-0 h-full w-[250px] md:w-[300px] z-10 p-1 rounded opacity-90" onClick={(e) => setListOpen(false)} >
                {/* OPEN/CLOSE BUTTON HERE ========= */}
                <button className="block text-center mt-2 ml-2 md:mt-5 md:ml-5 z-20 p-2 text-[1.7rem] duration-1000 font-semibold text-yellow-700 rounded aspect-square bg-yellow-200 relative" style={{ opacity: `${visible ? '.95' : '0'}` }} onClick={(e) => {
                    e.stopPropagation()
                    setListOpen(state => !state)
                }} >
                    <span className="mx-auto" ><FaMusic /></span>
                    <GoTriangleDown className="flex-grow-0 absolute text-yellow-400 top-[80%] h-[50px] duration-200" style={{ transform: `rotate(${listOpen ? "180deg" : "0deg"})` }} />
                </button>
                {/* END OF BUTTON ============ */}
                {/* SONG LIST HERE ============ */}
                <div className="max-w-lg p-3 bg-yellow-50 rounded-xl bg-opacity-90  transition duration-200 mt-10 ml-5 relative z-2000" style={{ opacity: `${listOpen ? '1 ' : '0'}` }}>
                    <ul className="flex flex-col max-h-[200px] overflow-y-auto" onScroll={(e) => e.stopPropagation()}>
                        {radioStations.map((station, index) => (
                            <Card key={index} index={index} station={station} handleTrackChange={handleTrackChange} />
                        ))}
                        <li className="py-1 ">
                            <button className="duration-75 font-bold" onClick={(e) => { }}>
                                <span className="bg-yellow-400  text-yellow-900 p-1 mr-1 text-lg font-semibold inline-block min-w-[40px]">0{7}</span>
                                <span>+Add</span>
                            </button>
                        </li>
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