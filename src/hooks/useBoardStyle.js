export default function useBoardStyle({rows, columns}){
    let str = '';
    let style = {};

    for(let i=0; i<rows; i++)
        str += `auto `;
    style['gridTemplateRows'] = str;
    
    str = '';

    for(let i=0; i<columns; i++)
        str += `auto `;
    style['gridTemplateColumns'] = str;

    return style;
}