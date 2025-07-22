/**
    给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

    你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

    你可以按任意顺序返回答案。


    示例 1：

    输入：nums = [2, 7, 11, 15], target = 9
    输出：[0, 1]
    解释：因为 nums[0] + nums[1] == 9 ，返回[0, 1] 。
    示例 2：

    输入：nums = [3, 2, 4], target = 6
    输出：[1, 2]
    示例 3：

    输入：nums = [3, 3], target = 6
    输出：[0, 1]


    提示：

    2 <= nums.length <= 104
        - 109 <= nums[i] <= 109
        - 109 <= target <= 109
    只会存在一个有效答案


    进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？
 */

/**
* @param {number[]} nums
* @param {number} target
* @return {number[]}
*/
var twoSum1 = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        const n = target - nums[i]
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] === n) {
                return [i, j]
            }
        }
    }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function (nums, target) {
    if (!nums || nums.length === 0) return 0;
    const map = new Map()
    const len = nums.length
    for (let i = 0; i < len; i++) {
        if (map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i]
        } else {
            map.set(nums[i], i)
        }
    }
    return 0;
};