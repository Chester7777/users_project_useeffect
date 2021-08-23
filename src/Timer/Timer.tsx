import {useEffect, useState} from "react"
import s from "../Timer/Timer.module.css"


type TimerPropsType = {
    setSeconds: (actualSeconds: number) => void
    seconds: number
}

export const Timer = (props: TimerPropsType) => {
    let [seconds, setSeconds] = useState<number>(props.seconds);

    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds]);

    useEffect(() => {
        props.setSeconds(seconds)
    }, [seconds]);

    useEffect(() => {
       const timeoutId = setTimeout(() => {
            setSeconds(--seconds)
        }, 1000)
        return () => clearTimeout(timeoutId)
    }, [seconds]);

    //тоже но с setInterval
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setSeconds(()=>--seconds)
    //         // if(count === 0) {
    //         //     return 0
    //         // }
    //     }, 1000)
    //     return () => clearInterval(intervalId)
    // }, [seconds]);

    return <div className={s.timerBox}>
        {seconds}
    </div>
}