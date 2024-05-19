import React, { useState } from 'react';
import { Action, actionForKey } from '../utilities/gameController';
import playerController from '../utilities/playerController';
import useInterval from '../hooks/useInterval';

export default function GameController({board, setGameOver, player, setPlayer, resetPlayer, inputRef}) {

    function keyUp({key}){
        if(actionForKey(key) === Action.Quit)
            setGameOver(true);
    }

    function keyDown({key}){
        playerController({action:actionForKey(key), board, player, setPlayer, resetPlayer, setGameOver});
    }

    useInterval(() => {
        playerController({action:Action.SlowDrop, board, player, setPlayer, resetPlayer, setGameOver});
    }, 1000);

  return (
    <input className='controller' onKeyUp={keyUp} onKeyDown={keyDown} ref={inputRef} autoFocus></input>
  )
}
