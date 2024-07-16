import { isUpperCase } from "../isuppercase"
export function isvalidbishopmove(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
    if(rowindex==x&&colindex==y){
        return false
    }
    if(x>=0&&x<8&&y>=0&&y<8){
        //prevent same color capture
        if(isUpperCase(piece)===isUpperCase(board[x][y])&&board[x][y]!=="1"){
            return false
        }
        //primary
        if(Number(rowindex)-x!=Number(colindex)-y&&Number(rowindex)+Number(colindex)==x+y){
            return false
        }
    }
    return true
}