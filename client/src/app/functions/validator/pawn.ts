export function isvalidpawnmove(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
    if(rowindex==x&&colindex==y){
        return false
    }
    if(piece=="P"){
        //normal move
        if(x+1==rowindex&&colindex==y&&board[x][y]==="1"){
            return true
        }
        //first move advantage
        if(rowindex==6 && colindex==y){
            if(x+2==rowindex){
                return true
            }
        }
        //diagonal move
        if(x+1==rowindex&&(colindex==y-1||colindex==y+1)&&board[x][y]!=="1"&& !isUpperCase(board[x][y])){
            return true
        }
    }
    if(piece=="p"){
        //normal move
        if(x-1==rowindex&&colindex==y&&board[x][y]==="1"){
            return true
        }
        //first move advantage
        if(rowindex==1&&colindex==y){
            if(x-2==rowindex){
                return true
            }
        }
        //diagonal move
        if(x-1==rowindex&&(colindex==y-1||colindex==y+1)&&board[x][y]!=="1"){
            return true
        }
    }
    return false
}
function isUpperCase(letter:string) {
    return letter === letter.toUpperCase();
  }