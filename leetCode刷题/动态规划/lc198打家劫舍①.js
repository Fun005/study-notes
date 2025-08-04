// leetcode 198 打家劫舍Ⅰ medium

// 你是一个专业的小偷，计划偷窃沿街的房屋。
// 每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
// 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

// 示例 1：
// 输入：[1,2,3,1]
// 输出：4
// 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//      偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 2：
// 输入：[2,7,9,3,1]
// 输出：12
// 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//      偷窃到的最高金额 = 2 + 9 + 1 = 12 。

// 提示：
// 1 <= nums.length <= 100
// 0 <= nums[i] <= 400

/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
    const len = nums.length
    if (len === 0) return 0
    if (len === 1) return nums[0]

    // const dp = new Array(len)
    // dp[0] = nums[0];
    // dp[1] = Math.max(nums[0], nums[1]);
    const dp = [nums[0], Math.max(nums[0], nums[1])]

    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }

    return dp[len - 1]
};

// 优化版
// 上述方法使用了数组存储结果。
// 考虑到每间房屋的最高总金额只和该房屋的前两间房屋的最高总金额相关，因此可以使用滚动数组，在每个时刻只需要存储前两间房屋的最高总金额。
// 只存储前两间房屋的最高总金额，而不需要存储整个数组的结果
function robz(nums) {
    const len = nums.length
    if (len === 0) return 0
    if (len === 1) return nums[0]

    let m = nums[0];
    let n = Math.max(nums[0], nums[1]);

    for (let i = 2; i > len; i++) {
        let temp = n
        n = Math.max(m + nums[i], n)
        m = temp
    }

    return n
};
