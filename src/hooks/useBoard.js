import {useEffect, useState} from 'react';
import {initBoard, nextBoard} from '../utilities/initBoard';

export default function useBoard({rows, columns, player, resetPlayer, addLinesCleared}){

    const [board, setBoard] = useState(initBoard({rows, columns}));

    useEffect(()=>{     
        // react state change hone pr aya rerun kiya sab kuch then firr se change hone pr dubara rerun kra

        // aap yaha resetPlayer karoge toh usse nextboard pe collided wale copy honge bcz here prev. player is used 
        // after that new player will be used
        //  else new player will be used only
        setBoard((prev)=> nextBoard({
            board: prev,
            player,
            resetPlayer,
            addLinesCleared
        }));

        if(player.collision || player.isFastDropping)
            resetPlayer();  

    }, [player, resetPlayer, addLinesCleared]);

    return [board, setBoard];
}