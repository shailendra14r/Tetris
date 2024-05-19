import React from 'react';
import './Menu.css';

export default function Menu({setGameOver}) {

    const startGame = ()=>{
        setGameOver(false);
    } 

  return (
    <div className='menu'>
        <button className='btn' onClick={startGame}>Play Game</button>
    </div>
  )
}
