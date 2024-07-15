import { isvalidpawnmove } from "./pawn";

export function isvalidmove(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
        if(isvalidpawnmove(rowindex,colindex,x,y,piece,board)){
            console.log("valid move")
            return true
        }
    return false;
}