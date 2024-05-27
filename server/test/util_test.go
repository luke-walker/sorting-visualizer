package test

import (
    "testing"

    "server/util"
)

func TestRandNums(t *testing.T) {
    runTest := func(n uint16) {
        randNums := util.RandNums(n)
        if uint16(len(randNums)) != n {
            t.Errorf("randNums length is %d, should be %d", len(randNums), n)
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

func TestAddStep(t *testing.T) {
    var steps [][]uint16

    step1 := []uint16{1,2,3}
    steps = util.AddStep(steps, step1)
    if steps[0][0] != step1[0] {
        t.Fatal("step1 not added")
    }

    step2 := []uint16{4,5,6}
    steps = util.AddStep(steps, step2)
    if steps[1][0] != step2[0] {
        t.Fatal("step2 not added")
    }

    step3 := []uint16{7,8,9}
    steps = util.AddStep(steps, step3)
    if steps[2][0] != step3[0] {
        t.Fatal("step3 not added")
    }
}
