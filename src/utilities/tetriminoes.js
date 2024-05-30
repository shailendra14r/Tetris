const TETROMINOES = {
    tetromino__I : {
        shape: [[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]],
        className: "tetromino__I"
    },
    tetromino__J : {
        shape: [[0,1,0], [0,1,0], [1,1,0]],
        className: "tetromino tetromino__J"
    },
    tetromino__L : {
        shape: [[0,1,0], [0,1,0], [0,1,1]],
        className: "tetromino tetromino__L"
    },
    tetromino__O : {
        shape: [[1,1], [1,1]],
        className: "tetromino tetromino__O"
    },
    tetromino__S : {
        shape: [[0,1,1], [1,1,0], [0,0,0]],
        className: "tetromino tetromino__S"
    },
    tetromino__T : {
        shape: [[1,1,1], [0,1,0], [0,0,0]],
        className: "tetromino tetromino__T"
    },
    tetromino__Z : {
        shape: [[1,1,0], [0,1,1], [0,0,0]],
        className: "tetromino tetromino__Z"
    }
}

export default function randomTetromino(){
    const keys = Object.keys(TETROMINOES);
    const rt = Math.floor(Math.random() * keys.length);
    return TETROMINOES[keys[rt]];
}



export function transferToBoard({
    className,
    shape,
    board,
    isOccupied,
    position
   }){


    for(let i=0; i<shape.length; i++)
    {
        for(let j=0; j<shape[i].length; j++)
        {
            if(shape[i][j])
            {
                let ni = position.i + i;
                let nj = position.j + j;
                board[ni][nj] = {
                    className,
                    occupied: isOccupied
                } 
            }
        }                        
    }

    return board;

}

export function rotate({shape, direction}){

    let nshape = [];
    for(let i=0; i<shape.length; i++)
    {
        const t = [];
        for(let j=0; j<shape[i].length; j++)
            t.push(0);
        nshape.push(t);
    }

    for(let i=0; i<shape.length; i++)
    {
        for(let j=0; j<shape[i].length; j++)
        {
            if(direction === 1)
                nshape[j][shape.length-i-1] = shape[i][j];
            else
                nshape[shape.length-j-1][i] = shape[i][j];
        }
    }

    return nshape;
}