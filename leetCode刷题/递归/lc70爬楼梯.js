// leetcode 70 爬楼梯 easy

// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？


function climbStairs(n) {

	const result = [1, 1]

	for (let i = 2; i <= n; i++) {
		result[i] = result[i - 1] + result[i - 2]
	}

	return result[n]
}
