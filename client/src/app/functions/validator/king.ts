import { isUpperCase } from "../isuppercase"
import { withinbounds } from "../withinbounds"

export function isvalidkingmove(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
    if(rowindex==x&&colindex==y){
        return false
    }
    if(isUpperCase(piece)===isUpperCase(board[x][y])&&board[x][y]!=="1"){
        return false
    }
    const row=[-1,-1,0,1,1,1,0,-1,-1]
    const col=[0,1,1,1,0,-1,-1,-1]
    for(let i=0;i<8;i++){
        if(x==Number(rowindex)+row[i]&&y==Number(colindex)+col[i]&&withinbounds(x,y)){
            return true
        }
    }
return false
}

export function iscastle(rowindex:number,colindex:number,x:number,y:number,piece:string,board:string[][]){
return true
}