import { useCallback, useState } from "react";

const initStats = {
    level : 0,
    linesCompleted : 0,
    linesPerLevel : 10
};

export default function useGameStats(){

    const [gameStats, setGameStats] = useState(initStats);

    const addLinesCleared = useCallback(() => {
        const { level, linesCompleted, linesPerLevel } = gameStats;

        if(linesCompleted === linesPerLevel)
            setGameStats({...gameStats, level: level+1 , linesCompleted: 0});
        else
            setGameStats({...gameStats, linesCompleted: linesCompleted+1});
    }, [gameStats]);

    return [gameStats, addLinesCleared];
}