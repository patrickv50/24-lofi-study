import { useEffect, useState } from "react"

const useFadeIn = () => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setVisible(true)
    }, [])
    return [visible]
}

export default useFadeIn