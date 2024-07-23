export function fengenerator(board:string[][],color:string){
let fen:string=""
if(color==="white"){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let lastchar=fen.charAt(fen.length-1)
            if(isNumber(lastchar)&&isNumber(board[i][j])){
                fen=fen.substring(0,fen.length-1)+(Number(lastchar)+Number(board[i][j]))
            }else{
                fen=fen+board[i][j]
            }
        }
        if(i!==7){
            fen=fen+'/'
        }
    }
}else{
    for(let i=7;i>=0;i--){
        for(let j=7;j>=0;j--){
            let lastchar=fen.charAt(fen.length-1)
            if(isNumber(lastchar)&&isNumber(board[i][j])){
                fen=fen.substring(0,fen.length-1)+(Number(lastchar)+Number(board[i][j]))
            }else{
                fen=fen+board[i][j]
            }
        }
        if(i!==0){
            fen=fen+'/'
        }
    }
}
fen=fen+` ${color==="white"?"b":"w"} KQkq - 0 1`
//console.log(fen)
return fen
}
function isNumber(str:any) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}