package algs

import (
    "server/util"
)

// Time Complexity: O(n^2)
// Auxiliary Space: O(1)
func BubbleSort(nums []uint16) [][]uint16 {
    n := len(nums)

    var steps [][]uint16
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
