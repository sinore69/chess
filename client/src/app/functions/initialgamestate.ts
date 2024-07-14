export function initialgamestate(board:string[][]){
    const pieces='rnbqkbnr'
    const pawn='p'
    for(let i=0;i<8;i++){
        board[i][0]=pieces.charAt(i)
        board[i][7]=pieces.charAt(i).toUpperCase()
        board[i][1]=pawn
        board[i][6]=pawn.toUpperCase()
    }
    for(let i=0;i<8;i++){
        for(let j=2;j<6;j++){
            board[i][j]='1'
        }
    }
}