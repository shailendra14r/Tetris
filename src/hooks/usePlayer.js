import { useCallback, useState } from "react";
import randomTetromino from "../utilities/tetriminoes";

function buildPlayer(previous)
{
    let tetrominoes;

    if(!previous)
        tetrominoes = [randomTetromino(), randomTetromino(), randomTetromino(), randomTetromino()];
    else
    {
        tetrominoes = [...previous.tetrominoes];
        tetrominoes.push(randomTetromino());
        // apne yaha pr new player jo banaya vo hi galat banaya
        // ab jo rerender hoga vo hi glt player ke sath hoga
    }    

    return {
        collision: false,
        isFastDropping: false,
        position: {i:0, j:4},
        tetrominoes,
        tetromino: tetrominoes.shift()
    };
}



export default function usePlayer(){
    const [player, setPlayer] = useState(()=> buildPlayer());

    const resetPlayer = useCallback(()=>{
        setPlayer((prev)=> buildPlayer(prev));
    }, []);

    return [player, setPlayer, resetPlayer];
}