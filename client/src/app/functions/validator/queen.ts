import { isvalidbishopmove } from "./bishop";
import { isvalidrookmove } from "./rook";
export function isvalidqueenmove(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
    if(isvalidbishopmove(rowindex,colindex,x,y,piece,board)||isvalidrookmove(rowindex,colindex,x,y,piece,board)){
        return true
    }
    return false
}