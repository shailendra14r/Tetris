import React, { useState } from 'react';
import Tetris from './Tetris';
import Menu from './Menu';

export default function Game() {
  const [gameOver, setGameOver] = useState(true);
  
  return (
    <div className='game'>
        {gameOver ? <Menu setGameOver={setGameOver}/> : <Tetris setGameOver={setGameOver} />}
    </div>
  )
}
