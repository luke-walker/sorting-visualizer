package algs

import (
    "server/util"
)

// Time Complexity: O(n^2)
// Auxiliary Space: O(1)
func SelectionSort(nums []int) [][]int {
    n := len(nums)

    var steps [][]int
    steps = util.AddStep(steps, nums)

    for i := 0; i < n - 1; i++ {
        jMin := i

        for j := i + 1; j < n; j++ {
            if (nums[j] < nums[jMin]) {
                jMin = j
            }
        }

        if (i != jMin) {
            nums[i], nums[jMin] = nums[jMin], nums[i]

            steps = util.AddStep(steps, nums)
        }
    }

    return steps
}
