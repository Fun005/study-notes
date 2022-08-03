// 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
	const len = nums.length
	if(len === 0) return [-1, -1]

	let left = 0, right = len - 1, mid = 0

  while(left <= right) {
  	mid = (left + right) >>1
  	if(nums[mid] === target) break

  	if(nums[mid] < target) {
  		left = mid + 1
  	} else {
  		right = mid - 1
  	}
  }

  if(left > right) return [-1, -1]

  let start = mid, end = mid

  while(nums[start] === nums[start - 1]) start--
  while(nums[end] === nums[end + 1]) end++

  return [start, end]
};