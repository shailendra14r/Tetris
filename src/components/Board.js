import "./Board.css";
import useBoardStyle from "../hooks/useBoardStyle";
import BoardCell from "./BoardCell";

export default function Board({board, rows, columns}) {
  const style = useBoardStyle({rows, columns});


  return (
    <div className='board' style={style}>
      {
        board.boardRows.map((row, i)=>
          row.map((cell, j)=>
            <BoardCell key={row.length*i + j} cell={cell} /> 
          ))
      }
    </div>
  )
}
