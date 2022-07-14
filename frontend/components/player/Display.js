import { useEffect, useState } from "react"

const bgs = [...Array(14).keys()]
const Display = ({ trackName }) => {
    console.log(trackName)
    const [currentBgNum, setCurrentBgNum] = useState(0)
    useEffect(() => {
        let num=Math.abs(Math.floor(Math.random() *( bgs.length )))
        console.log(num)
        setCurrentBgNum(num)
    }, [trackName])
    return (
        <div className="display-container">
            <img src={`/media/${currentBgNum}.gif`} />
            <div className='crt_lines' />
            <div className='vignette' />
            <div className='darken' />
            <h1 className="text-yellow-50 text-[2rem] top-5 left-5 absolute z-10">{trackName}</h1>
        </div>
    )
}

export default Display