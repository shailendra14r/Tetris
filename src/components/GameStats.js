import React from 'react';
import './GameStats.css';
import Previews from './Previews';

export default function GameStats({gameStats, tetrominoes}) {

  const {level, linesCompleted, linesPerLevel} = gameStats;
  const linesTolevel = linesPerLevel - linesCompleted;
  const points = level*100 + linesCompleted*10;

  return (
    <div className='gamestats'>
      <Previews tetrominoes={tetrominoes} />
      <ul className='score'>
        <li>Level</li>
        <li className='value'>{level}</li>
        <li>Lines to Level</li>
        <li className='value'>{linesTolevel}</li>
        <li>Points</li>
        <li className='value'>{points}</li>
      </ul>
    </div>
  )
}
