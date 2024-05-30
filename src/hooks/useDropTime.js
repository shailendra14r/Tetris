import { useCallback, useState, useEffect } from "react";

const initialDropTime = 1000;
const minDropTime = 100;
const speedIncrement = 1000;

export default function useBoard({ gameStats }){

    const [dropTime, setDropTime] = useState(initialDropTime);
    const [prevDropTime, setPrevDropTime] = useState(null);

    // useCallback ke andar jo state use kr rahe ho uski value purani hi rahegi agar tum usko dependency nhi banaoge...
    // pr callback ke andar ke variables ki value change next render pe hi hogi

    const resetDropTime = useCallback(()=>{
        setDropTime(dropTime);
    }, [dropTime]);

    const pauseDropTime = useCallback(()=>{
        if(dropTime)
        {
            setPrevDropTime(dropTime);
            console.log(dropTime);
        }
        setDropTime(null);
    }, [dropTime, setDropTime, setPrevDropTime]);

    const resumeDropTime = useCallback(()=>{
        if(!prevDropTime)
            return ;
        setDropTime(prevDropTime);
        setPrevDropTime(null);
    }, [prevDropTime, setDropTime, setPrevDropTime]);

    useEffect(()=>{
        //  check for value of level at very first level
        const dropSpeed = initialDropTime - (gameStats.level * speedIncrement);
        const newDropTime = Math.max(dropSpeed, minDropTime);
        setDropTime(newDropTime);

    }, [gameStats.level, setDropTime]);

    return [dropTime, pauseDropTime, resumeDropTime, resetDropTime];
}