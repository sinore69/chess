package functions

import "testing"

func TestIsKingSafe(t *testing.T) {
	board := [8][8]string{
		{"R", "N", "1", "K", "Q", "B", "N", "R"},
		{"1", "P", "P", "1", "1", "P", "P", "P"},
		{"1", "1", "1", "1", "1", "1", "1", "1"},
		{"P", "1", "1", "1", "1", "1", "1", "1"},
		{"p", "1", "1", "1", "1", "1", "B", "1"},
		{"1", "1", "1", "1", "1", "1", "1", "1"},
		{"r", "p", "p", "1", "1", "p", "p", "p"},
		{"1", "n", "b", "k", "q", "b", "n", "r"}}
	res := IsKingSafe(board, "03", "73", "b")
	expected :=true
	if res != expected {
        t.Errorf("testing error")
    }
}
