import {useEffect, useState} from "react"
import {UserType} from "./Github"


type TimerPropsType = {
    usersDetail: UserType | null
    // onReset: (value: null | UserType) => void
    setSeconds: (actualSeconds: number) => void
    seconds: number
}

export const Timer = (props: TimerPropsType) => {
    let [seconds, setSeconds] = useState<number>(props.seconds);

    // if(!props.usersDetail) {
    //     setSeconds(seconds)
    // }
    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds]);

    useEffect(() => {
        props.setSeconds(seconds)
    }, [seconds]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log(`count: ${--seconds}`)
    //         props.onReset(null)
    //     }, 6000)
    // }, [props.usersDetail]);


    useEffect(() => {
       const timeoutId = setTimeout(() => {
            setSeconds(--seconds)
            // if(count === 0) {
            //     return 0
            // }
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

    return <div>
        {seconds}
    </div>
}