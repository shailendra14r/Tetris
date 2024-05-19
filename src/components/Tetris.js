import React, { useRef } from 'react';
import Board from './Board';
import GameStats from './GameStats';
import useBoard from '../hooks/useBoard';
import useGameStats from '../hooks/useGameStats';
import usePlayer from '../hooks/usePlayer';
import GameController from './GameController';

export default function Tetris({setGameOver}) {
  const rows = 20, columns = 10;
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [gameStats, addLinesCleared] = useGameStats();
  const [board, setBoard] = useBoard({rows, columns, player, resetPlayer, addLinesCleared});

  // focus on input element looses when we click outside tetris
  // Game ending problem
  const inputRef = useRef(0);

  return (
    <div className='tetris' onClick={()=> inputRef.current.focus()}>
        <Board board={board} rows={rows} columns={columns} addLinesCleared={addLinesCleared} />
        <GameStats gameStats={gameStats} tetrominoes={player.tetrominoes} />
        <GameController board={board} setGameOver={setGameOver} player={player} setPlayer={setPlayer} resetPlayer={resetPlayer} inputRef ={inputRef} />
    </div>
  )
}
