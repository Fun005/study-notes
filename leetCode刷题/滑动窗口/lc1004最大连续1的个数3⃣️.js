// 给定一个二进制数组 nums 和一个整数 k，
// 如果可以翻转最多 k 个 0 ，
// 则返回 数组中连续 1 的最大个数 。


function longestOnes (nums, k) {
	const len = nums.length
	if(len == 0) return 0

	let left = 0, right = 0, zeroNum = 0, result = 0;

	while(right < len) {
		if(nums[right++] == 0) {
			zeroNum++
		}
		// right++

		while(zeroNum > k) {
			if(nums[left++] == 0) {
				zeroNum--
			}
			// left++
		}

		result = Math.max(result, right - left)
	}

	return result
}