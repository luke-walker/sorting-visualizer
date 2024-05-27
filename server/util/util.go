package util

import (
    "math/rand/v2"
)

func RandNums(n uint16) []uint16 {
    res := make([]uint16, n)

    // populate slice with numbers
    for i := range uint16(n) {
        res[i] = i + 1
    }

    // Fisher-Yates shuffle
    for i := n - 1; n >= 1; n-- {
        j := rand.UintN(uint(i))
        res[i], res[j] = res[j], res[i]
    }

    return res
}

func AddStep(steps [][]uint16, step []uint16) [][]uint16 {
    copyStep := make([]uint16, len(step))
    copy(copyStep, step)
    steps = append(steps, copyStep)

    return steps
}
