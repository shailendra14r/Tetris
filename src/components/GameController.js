import React from 'react';
import { Action, actionForKey, actionIsDrop} from '../utilities/gameController';
import playerController from '../utilities/playerController';
import useInterval from '../hooks/useInterval';
import useDropTime from '../hooks/useDropTime';
import useGameStats from '../hooks/useGameStats';

export default function GameController({board, setGameOver, player, setPlayer, resetPlayer, inputRef}) {

  const [gameStats] = useGameStats();
  const [dropTime, pauseDropTime, resumeDropTime, resetDropTime] = useDropTime({ gameStats });
  
    function keyUp({key}){
        const action = actionForKey(key);
        if(action === Action.Quit)
            setGameOver(true);

        // anyone can hold the key retain game at pause state
        // if(actionIsDrop(action))
        //   resumeDropTime();
    }

    function keyDown({key}){
        const action = actionForKey(key);

        if(action === Action.Pause)
        {
          if(dropTime)
            pauseDropTime();
          else 
            resumeDropTime();
        }
        else if(action === Action.FastDrop)
        {
          setPlayer((prv)=> ({...prv, isFastDropping:true}));
          playerController({action, board, player, setPlayer, resetPlayer, setGameOver});
        }
        else if(action === Action.Quit)
          setGameOver(true);
        else
        {
          if(dropTime)
          {
            playerController({action, board, player, setPlayer, resetPlayer, setGameOver});
            // if(actionIsDrop(action))
            // {
            //   pauseDropTime();
            //   // console.log('This is not working ---> why?');
            //   // resetDropTime();
            // }
          }
        }

    }

    // if dropTime is null it will automatically return
    useInterval(() => {
        playerController({action:Action.SlowDrop, board, player, setPlayer, resetPlayer, setGameOver});
    }, dropTime);

  return (
    <input className='controller' onKeyUp={keyUp} onKeyDown={keyDown} ref={inputRef} autoFocus></input>
  )
}
