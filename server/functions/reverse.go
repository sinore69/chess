package functions

func Reverse(board [8][8]string) [8][8]string {
	var newBoard [8][8]string
	for i := 0; i < 8; i++ {
		for j := 0; j < 8; j++ {
			newBoard[i][j] = board[7-i][7-j]
		}
	}
	return newBoard
}
