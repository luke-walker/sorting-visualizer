package test

import (
    "testing"

    "server/algs"
    "server/util"
)

func TestSortAlgs(t *testing.T) {
    runTest := func(name string, fn (func([]int) [][]int)) {
        n := 100
        randNums := util.RandNums(n)
        sortedSteps := fn(randNums)
        nSteps := len(sortedSteps)
        
        inorder := true
        for i := range n {
            if sortedSteps[0][i] != i {
                inorder = false
                break
            }
        }
        if inorder {
            t.Errorf("%s failed (data already in-order)", name)
        }

        for i := range n {
            if sortedSteps[nSteps-1][i] != i + 1 {
                t.Errorf("%s failed", name)
            }
        }
    }

    runTest("Bubble Sort", algs.BubbleSort)
    runTest("Insertion Sort", algs.InsertionSort)
}
