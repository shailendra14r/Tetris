import { transferToBoard } from "./tetriminoes";

export function initBoard({rows, columns}){
    let board = [];
    for(let i=0; i<rows; i++)
    {
        let t = [];
        for(let j=0; j<columns; j++)
            t.push({
                occupied: false,
                className: ''
            });
        board.push(t);
    }
    return {
        boardRows: board,
        size: {
            rows,
            columns
        }
    };
}

export function nextBoard({ board, player, resetPlayer, addLinesCleared }){

    const { tetromino, position } = player;

    // console.log({player});

    const nboard = board.boardRows.map((row, i)=>
        row.map((cell, j)=> cell.occupied? cell : {className:'', occupied:false}
        )
    )

    transferToBoard({
        className : tetromino.className,
        position,
        isOccupied: player.collision,
        shape : tetromino.shape,
        board : nboard 
    })

    return {
        boardRows: nboard,
        size: {...board.size}
    }
}


export function isWithinBoard({board, shape, position}){

    for(let i=0; i<shape.length; i++)
    {
        for(let j=0; j<shape[i].length; j++)
        {
            const ni = i + position.i; 
            const nj = j + position.j; 
            if(shape[i][j] && (ni>=board.size.rows || nj>=board.size.columns || ni<0 || nj<0))
                return false;
        }
    }
    return true;
}

// collision and within board are still problem
export function isCollision({board, shape, position}){

    for(let i=0; i<shape.length; i++)
    {
        for(let j=0; j<shape[i].length; j++)
        {
            const ni = i + position.i; 
            const nj = j + position.j; 

            if(shape[i][j] && ni<board.size.rows && nj<board.size.columns && ni>=0 && nj>=0 && board.boardRows[ni][nj].occupied)
                return true;
        }
    }

    return false;
}