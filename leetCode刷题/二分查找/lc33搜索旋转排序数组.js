// 整数数组 nums 按升序排列，数组中的值 互不相同 。

// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，
// 使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。
// 例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

// 给你 旋转后 的数组 nums 和一个整数 target ，
// 如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
	const len = nums.length
	if(len === 0) return -1

	let left = 0, right = len - 1
	while(left <= right) {
		//  >>1 相当于除以2向下取整
		let mid = (left + right) >> 1

		if(nums[mid] === target) return mid

		// 如果中间数小于最右边数，则右半段是有序的
    // 如果中间数大于最右边数，则左半段是有序的
		if(nums[mid] < nums[right]) {
			// 判断target是否在(mid, end]之间
			if(target > nums[mid] && target <= nums[right]) {
				// 如果在，则中间数右移即left增大
        left = mid + 1;
			} else {
				// 如果不在，则中间数左移即right减小
        right = mid - 1;
			}
		} else {
			if(target < nums[mid] && target >= nums[left]) {
				right = mid - 1
			} else {
				left = mid + 1
			}
		}
	}

	return -1
};