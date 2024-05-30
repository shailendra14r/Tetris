import { useCallback, useState } from "react";

const initStats = {
    level : 0,
    linesCompleted : 0,
    linesPerLevel : 10,
    points: 0
};

export default function useGameStats(){

    const [gameStats, setGameStats] = useState(initStats);

    const addLinesCleared = useCallback((linesCleared) => {

        setGameStats((prev)=>{

            const points = prev.points + Math.pow(2, linesCleared) * 10;
            let linesCompleted = prev.linesCompleted + linesCleared;
            let level = prev.level;
            if(linesCompleted >= prev.linesPerLevel)
            {
                linesCompleted = linesCompleted % prev.linesPerLevel;
                ++level;
            }
            return{
                ...prev,
                points,
                linesCompleted,
                level
            };
        });
        
    },[]);

    return [gameStats, addLinesCleared];
}