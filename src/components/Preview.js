import React from 'react';
import BoardCell from './BoardCell';
import { transferToBoard } from '../utilities/tetriminoes';
import {initBoard} from '../utilities/initBoard';
import useBoardStyle from '../hooks/useBoardStyle';

// show next 5 pieces

export default function Preview({tetromino}) {
    const {className, shape} = tetromino;

   const spboard = initBoard({rows:4, columns:4});
   const style = useBoardStyle(spboard.size);

   spboard.boardRows = transferToBoard({
        className,
        shape,
        isOccupied: false,
        board : spboard.boardRows,
        position: {i:0, j:0}
   });

  return (
    <div className='spboard' style={style}>
        {
            spboard.boardRows.map((row, i)=>
                row.map((cell, j)=>
                    <BoardCell key={row.length*i + j} cell={cell} />
            ))
        }
    </div>
  )
}
