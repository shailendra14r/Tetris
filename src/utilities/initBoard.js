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

function findDropPosition({board, player, shape})
{
    let i = player.position.i, tsh = 0, possible = false;
    for(let x=0; x<shape.length; ++x)
    {
        let f = 0;
        for(let y=0; y<shape[x].length; ++y)
            f = f || shape[x][y];
        if(f)
                tsh++;
        else
            break;
    }
    
    for(i = player.position.i+tsh; i<board.size.rows; ++i)
    {
        if(!isWithinBoard({board, shape, position:{...player.position, i}}) 
                || isCollision({board, shape, position:{...player.position, i}}) )
            break;
        else    
            possible = true;
    }

    return {dropPossible:possible ,dropPosition:{...player.position, i:i-1}};
}

export function nextBoard({ board, player, resetPlayer, addLinesCleared }){

    const { tetromino, position } = player;

    let nboard = board.boardRows.map((row, i)=>
        row.map((cell, j)=> cell.occupied? cell : {className:'', occupied:false}
        )
    )

    const {dropPossible, dropPosition} = findDropPosition({board, player, shape: tetromino.shape});
    
    if(dropPossible)
    {
        transferToBoard({ 
            className : "ghost",
            position: dropPosition,
            isOccupied: false,
            shape : tetromino.shape,
            board : nboard 
        })
    }

    transferToBoard({ 
        className : tetromino.className,
        position,
        isOccupied: player.collision,
        shape : tetromino.shape,
        board : nboard 
    })

    let lc = 0, i=0, j=0, rows = board.size.rows, columns = board.size.columns;

    for(i=0; i<rows; ++i)
    {
        for(j=0; j<columns; ++j)
        {
            if(!nboard[i][j].occupied)
                break;
        }
        if(j === columns)
        {
            console.log('column filled');
            ++lc;
            let fh = nboard.slice(0, i);
            let sh = nboard.slice(i+1, rows);

            console.log({fh, sh});

            let t = [[]];
            for(let k=0; k<columns; k++)
                t[0].push({
                    occupied: false,
                    className: ''
                });

            t = t.concat(fh);
            t = t.concat(sh);
            nboard = t;

        }
    }
    if(lc > 0)
        addLinesCleared(lc);

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