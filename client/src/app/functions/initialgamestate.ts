export function initialgamestate(){
    const board=[
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
  ]
    const pieces='rnbqkbnr'
    const pawn='p'
    for(let i=0;i<8;i++){
        board[0][i]=pieces.charAt(i)
        board[7][i]=pieces.charAt(i).toUpperCase()
        board[1][i]=pawn
        board[6][i]=pawn.toUpperCase()
    }
    board[4][3]='B'
    board[4][4]='b'
    return board
}