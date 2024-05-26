package util

import (
    "math/rand/v2"
)

func RandNums(n int) []int {
    res := make([]int, n)

    // populate slice with numbers
    for i := range n {
        res[i] = i + 1
    }

    // Fisher-Yates shuffle
    for i := n - 1; n >= 1; n-- {
        j := rand.IntN(i)
        res[i], res[j] = res[j], res[i]
    }

    return res
}

func AddStep(steps [][]int, step []int) [][]int {
    copyStep := make([]int, len(step))
    copy(copyStep, step)
    steps = append(steps, copyStep)
    return steps
}
