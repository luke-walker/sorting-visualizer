package test

import (
    "fmt"
    "testing"

    "server/util"
)

func TestRandNums(t *testing.T) {
    runTest := func(n int) {
        randNums := util.RandNums(n)
        if len(randNums) != n {
            t.Error(fmt.Sprintf("randNums length is %d, should be %d", len(randNums), n))
        }

        isRandom := false
        for i := range n {
            if randNums[i] != i + 1 {
                isRandom = true
                break
            }
        }
        if !isRandom {
            t.Error("randNums is not random (there is a very small possibility you got unlucky)")
        }
    }

    runTest(10)
    runTest(100)
    runTest(500)
}
