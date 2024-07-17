import { isUpperCase } from "../isuppercase"
import { withinbounds } from "../withinbounds"
export function isvalidrookmove(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
    if(rowindex==x&&colindex==y){
        return false
    }
    if(withinbounds(x,y)){
        //prevent same color capture
        if(isUpperCase(piece)===isUpperCase(board[x][y])&&board[x][y]!=="1"){
            return false
        }
        //prevent any other move other than vertival or hotizontal
        if(rowindex!=x&&colindex!=y){
            return false
        }
        if(colindex==y){
            //up-bottom
            for(let i=Number(rowindex)+1;i<x;i++){
                    if(board[i][colindex]!=="1"){
                        return false
                }
            }
            //bottom-up
            for(let i=Number(rowindex)-1;i>x;i--){
                    if(board[i][colindex]!=="1"){
                        return false
                }
            }
        }
        if(rowindex==x){
            //left to right
            for(let i=Number(colindex)+1;i<y;i++){
                    if(board[rowindex][i]!=="1"){
                        return false
                }
            }
            //right to left
            for(let i=Number(colindex)-1;i>y;i--){
                    if(board[rowindex][i]!=="1"){
                        return false
                }
            }
        }

    }
    return true
}
