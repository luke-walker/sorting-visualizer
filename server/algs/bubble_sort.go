package algs

import (
    "server/util"
)

func BubbleSort(nums []int) [][]int {
    n := len(nums)

    var steps [][]int
    steps = util.AddStep(steps, nums)
    for n > 1 {
        nextN := 0

        for i := 1; i < n; i++ {
            if nums[i-1] > nums[i] {
                nums[i-1], nums[i] = nums[i], nums[i-1]
                nextN = i

                steps = util.AddStep(steps, nums)
            }
        }
        n = nextN
    }

    return steps
}
