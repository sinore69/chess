import { isRookCheck } from "./validator/rook"

export function isUnderCheck(board:string[][],lastMove:string,color:string){
    const row=Number(lastMove.charAt(2))
    const col=Number(lastMove.charAt(3))
    const piece=board[row][col]
    if(piece==="r"||piece==="R"){
        if(isRookCheck(board,row,col)){
            return true
        }
    }

    return false
}