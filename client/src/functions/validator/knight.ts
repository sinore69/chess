import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";
export function isvalidknightmove(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
        if(rowindex==x&&colindex==y){
            return false
        }
        //prevent same color capture
        if(isUpperCase(piece)===isUpperCase(board[x][y])&&board[x][y]!=="1"){
            return false
        }
        const row=[2,1,-1,-2,-2,-1,1,2]
        const col=[1,2,2,1,-1,-2,-2,-1]
        for(let i=0;i<8;i++){
            if(x==Number(rowindex)+row[i]&&y==Number(colindex)+col[i]&&withinbounds(x,y)){
                return true;
            }
        }
    return false
}
