
export function updateposition(board:string[][],rowindex:number,colindex:number,x:number,y:number,piece:string) {
    const newboard=[
        ["1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1"],
    ]
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            newboard[i][j]=board[i][j]
        }
    }
     newboard[rowindex][colindex]='1'
     newboard[x][y]=piece
    return newboard
}
