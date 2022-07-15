import { useEffect, useRef, useState } from "react"

const bgs = [...Array(13).keys()]

const Display = ({ trackName }) => {
    const [currentBgNum, setCurrentBgNum] = useState(0)
    const timeOut = useRef()

    const changeBg = (x) => {
        clearTimeout(timeOut.current)
        if (x) setCurrentBgNum(x)
        else {
            setCurrentBgNum('transition')
            timeOut.current = setTimeout(() => {
                let num = Math.abs(Math.floor(Math.random() * (bgs.length)))
                setCurrentBgNum(num)
            }, 600)
        }
    }
    useEffect(() => {
        changeBg()
    }, [trackName])

    useEffect(() => {
        window.addEventListener("keypress", (e) => {
            if (new Set(['e', 'E']).has(e.key)) changeBg()
        })
        return () => window.removeEventListener("keypress", (e) => { console.log(e) })
    }, [])
    return (
        <div className="display-container">
            <img src={`/media/${currentBgNum}.gif`} />
            <div className='crt_lines' />
            <div className='vignette' />
            <div className='darken' />
            {trackName &&
                <div className="flex items-center top-5 left-5 absolute z-20">
                    <button className="min-w-[40px] opacity-0 text-[1.7rem] font-semibold text-yellow-700 aspect-square bg-yellow-200 mr-3 rounded-lg">5.</button>

                    <h1 className="text-yellow-50 text-[2rem]">{trackName ? trackName : ''}</h1>

                </div>}
        </div>
    )
}

export default Display