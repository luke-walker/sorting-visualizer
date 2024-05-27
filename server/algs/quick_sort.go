package algs

import (
    "server/util"
)

// Time Complexity: O(n^2)
// Auxiliary Space: O(log n)
func QuickSort(nums []uint16) [][]uint16 {
    var steps [][]uint16
    steps = util.AddStep(steps, nums)

    // Hoare's partition
    partition := func(arr []uint16, low int, high int) int {
        pivot := arr[low]
        i := low - 1
        j := high + 1
        for {
            for i++; arr[i] < pivot; i++ {}
            for j--; arr[j] > pivot; j-- {}

            if i >= j {
                return j
            }
            
            arr[i], arr[j] = arr[j], arr[i]
        }
    }

    var quickSort func([]uint16, int, int)
    quickSort = func(arr []uint16, low int, high int) {
        if low >= 0 && high >= 0 && low < high {
            p := partition(arr, low, high)

            steps = util.AddStep(steps, arr)

            quickSort(arr, low, p)
            quickSort(arr, p + 1, high)
        }
    }

    quickSort(nums, 0, len(nums) - 1)

    return steps
}

/*
func QuickSort(nums []int) [][]int {
    var steps [][]int
    steps = util.AddStep(steps, nums)

    // Lomuto's partition
    partition := func(arr []int, low int, high int) int {
        pivot := arr[high]

        i := low
        for j := low; j < high; j++ {
            if arr[j] < pivot {
                arr[i], arr[j] = arr[j], arr[i]
                i++
            }
        }

        arr[i], arr[high] = arr[high], arr[i]

        return i
    }

    var quickSort func([]int, int, int)
    quickSort = func(arr []int, low int, high int) {
        if low >= high || low < 0 {
            return
        }

        p := partition(arr, low, high)

        steps = util.AddStep(steps, arr)

        quickSort(arr, low, p - 1)
        quickSort(arr, p + 1, high)

    }

    quickSort(nums, 0, len(nums) - 1)

    return steps
}
*/
