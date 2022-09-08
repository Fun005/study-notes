// 给定一个含有 n 个正整数的数组和一个正整数 target 。

// 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] 
// 并返回其长度。如果不存在符合条件的子数组，返回 0 。


function minSubArrayLen(target, nums) {
	const len = nums.length
	if (len == 0) return 0

	let i = 0, j = 0, sum = 0
	let minLen = Infinity

	while (i < len) {
		sum += nums[i]
		while (sum >= target) {
			minLen = Math.min(minLen, i - j + 1)
			sum -= sum[j]
			j++
		}
		i++
	}

	return minLen == Infinity ? 0 : minLen
}
