export function fengenerator(board:string[][]){
let fen:string=""
for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
        let lastchar=fen.charAt(fen.length-1)
        if(isNumber(lastchar)&&isNumber(board[j][i])){
            fen=fen.substring(0,fen.length-1)+(Number(lastchar)+Number(board[j][i]))
        }else{
            fen=fen+board[j][i]
        }
    }
    if(i!==7){
        fen=fen+'/'
    }
}
}
function isNumber(str:any) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}