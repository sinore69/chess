package functions

import "testing"

func TestIsUpperCase(t *testing.T) {
	res := IsUpperCase("R") != IsUpperCase("k")
	exp := true
	if res != exp {
		t.Errorf("testing error 1")
	}
	res = IsUpperCase("R") != IsUpperCase("K")
	exp = false
	if res != exp {
		t.Errorf("testing error 2")
	}
}
