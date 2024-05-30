import { Action } from "./gameController";
import { isCollision, isWithinBoard } from "./initBoard";
import { rotate } from "./tetriminoes";

function attemptRotate({board, player, setPlayer, setGameOver})
{
    // direction make clockwise or anti-clockwise
    const shape = rotate({shape: player.tetromino.shape, direction:1});

    if(isWithinBoard({board, shape, position:player.position}) && 
        !isCollision({board, shape, position:player.position}))
    {

        setPlayer({
            ...player,
            tetromino: {
                ...player.tetromino,
                shape
            }        
        });
        return true;
    }
    else
        return false;

}

function moveToTarget({board, player, shift})
{
    let nextposition = {i : player.position.i + shift.i, j : player.position.j + shift.j};
    const withinboard = isWithinBoard({board, shape:player.tetromino.shape, position:nextposition}); 
    let collided = isCollision({board, shape:player.tetromino.shape, position:nextposition});

    const result = withinboard && !collided;

    if(!result)
        nextposition = player.position;

    if(shift.i>0 && (!withinboard || collided))
        collided = true;
    else
        collided = false;

    return {collided:collided, nextposition};

}

function attemptMovement({board, player, setPlayer, resetPlayer, setGameOver, action})
{
    const shift = {i:0, j:0};

    // as we cannot init it in if clause
    let isFastDropping = false;

    if(action === Action.FastDrop)
        isFastDropping = true;
    else if(action === Action.SlowDrop)
        shift.i = 1;
    else if(action === Action.Left)
        shift.j = -1;
    else if(action === Action.Right)
        shift.j = 1;
    else
        return ;

    if(isFastDropping)
    {
        shift.i = 1;
        let newplayer = player;

        while(true)
        {
            let {collided, nextposition} = moveToTarget({board, player:newplayer, shift});
            // console.log({board, player, shift});
            // console.log({collided, nextposition});
            if(collided)
            {
                setPlayer({
                    ...player,
                    isFastDropping,
                    collision: collided,
                    position: newplayer.position
                });
                return ;
            }
            else
            {
                newplayer = {...newplayer, position:nextposition};
            }
        }
   }

    const {collided, nextposition} = moveToTarget({board, player, shift});

    
    const checkGameOver = collided && player.position.i===0; 
    if(checkGameOver)
        setGameOver(true);

    // player value does not change if u also setState by updater style also just they are queued
    setPlayer({
        ...player,
        isFastDropping,
        collision: collided,
        position: nextposition
    });

}

export default function playerController({board, action, player, setPlayer, resetPlayer, setGameOver}){
    if(!action) return;

    if(action === Action.Rotate)
        attemptRotate({board, player, setPlayer, setGameOver});
    else
        attemptMovement({board, player, setPlayer, resetPlayer, setGameOver, action});
}