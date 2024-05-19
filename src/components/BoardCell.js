import React from 'react';

export default function BoardCell({cell}) {
  const {occupied, className} = cell;

  return (
    <div className={'BoardCell ' + className}>
      <div className='sparkle'></div>
    </div>
  )
}
