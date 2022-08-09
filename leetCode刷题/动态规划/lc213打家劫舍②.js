// leetcode 213 打家劫舍II medium

// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。
// 同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

// 示例 1：
// 输入：nums = [2, 3, 2]
// 输出：3
// 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

// 示例 2：
// 输入：nums = [1, 2, 3, 1]
// 输出：4
// 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
// 偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 3：
// 输入：nums = [1, 2, 3]
// 输出：3


// 提示：
// 1 <= nums.length <= 100
// 0 <= nums[i] <= 1000

/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
    let len = nums.length
    if (len === 0) return 0
    if (len === 1) return nums[0]
    if (len === 2) return Math.max(nums[0], nums[1])

    // 假设数组 nums 的长度为 n。
    // 如果不偷窃最后一间房屋，则偷窃房屋的下标范围是 [0, n-2]；
    // 如果不偷窃第一间房屋，则偷窃房屋的下标范围是 [1, n-1]

    return Math.max(helper(nums, 0, len - 2), helper(nums, 1, len - 1))
};

function helper(nums, start, end) {
    let m = nums[start]
    let n = Math.max(nums[start], nums[start + 1])

    for (let i = start + 2; i <= end; i++) {
        let temp = n
        n = Math.max(m + nums[i], n)
        m = temp
    }

    return n
}
