package algs

import (
    "server/util"
)

// Time Complexity: O(n^2)
// Auxiliary Space: O(1)
func InsertionSort(nums []int) [][]int {
    n := len(nums)

    var steps [][]int
    steps = util.AddStep(steps, nums)

    for i := 1; i < n; i++ {
        for j := i; j > 0 && nums[j-1] > nums[j]; j-- {
            nums[j], nums[j-1] = nums[j-1], nums[j]

            steps = util.AddStep(steps, nums)
        }
    }

    return steps
}
