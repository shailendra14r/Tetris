import React from 'react';
import Preview from './Preview';
import './Previews.css';

export default function Previews({tetrominoes}) {

  const tetrominoesPreview = tetrominoes;

  return (
    <div className='previews'>
      {
        tetrominoesPreview.map((tetromino, index)=>
          <Preview tetromino={tetromino} key={index}/>
        )
      }
    </div>
  )
}
