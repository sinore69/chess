import { isUpperCase } from "../isuppercase"
import { withinbounds } from "../withinbounds"
export function isvalidbishopmove(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
    if(rowindex==x&&colindex==y){
        return false
    }
    if(withinbounds(x,y)){
        //prevent same color capture
        if(isUpperCase(piece)===isUpperCase(board[x][y])&&board[x][y]!=="1"){
            return false
        }
        //is a diagonal move
        if(Math.abs(rowindex-x)==Math.abs(colindex-y)){
            //3rd quadrant-no block
            if(x>Number(rowindex)&&y>Number(colindex))
            for(let i=1;i<x-Number(rowindex);i++){
                if(board[Number(rowindex)+i][Number(colindex)+i]!="1"){
                    return false
                }   
            }
            //1st quadrant-no block
            if(x<Number(rowindex)&&y<Number(colindex))
            for(let i=1;i<Number(rowindex)-x;i++){
                if(board[Number(rowindex)-i][Number(colindex)-i]!="1"){
                    return false
                }   
            }
            //2nd quadrant-no block
            if(y>Number(colindex)&&x<Number(rowindex))
            for(let i=1;i<Number(rowindex)-x;i++){
                if(board[Number(rowindex)-i][Number(colindex)+i]!="1"){
                    return false
                }
            }
            //4th quadrant-no block
            if(y<Number(colindex)&&x>Number(rowindex))
            for(let i=1;i<x-Number(rowindex);i++){
                if(board[Number(rowindex)+i][Number(colindex)-i]!="1"){
                    return false
                }
            }
            return true
        }
    }
    return false
}