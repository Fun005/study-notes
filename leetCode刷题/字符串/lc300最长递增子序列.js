/**
    给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

    子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

    示例 1：

    输入：nums = [10,9,2,5,3,7,101,18]
    输出：4
    解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
    示例 2：

    输入：nums = [0,1,0,3,2,3]
    输出：4
    示例 3：

    输入：nums = [7,7,7,7,7,7,7]
    输出：1

    提示：

    1 <= nums.length <= 2500
    -104 <= nums[i] <= 104

    进阶：

    你能将算法的时间复杂度降低到 O(n log(n)) 吗?
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    if (nums.length === 0) return 0;

    const tails = [nums[0]]

    // 当遍历到的数字大于 tails 数组的最后一个元素时，直接添加到 tails 数组中
    // 否则在 tails 数组中找到第一个比遍历到的数字大的元素,将其替换成遍历到的数字
    for (let i = 0; i < nums.length; i++) {

        if (nums[i] > tails[tails.length - 1]) {
            tails.push(nums[i])
        } else {
            const index = getFirstBiggerIndex(nums[i])
            tails[index] = nums[i]
        }
    }
    return tails.length;

    function getFirstBiggerIndex(num) {
        // for (let j = 0; j < tails.length; j++) {
        //     if (tails[j] >= num) {
        //         return j
        //     }
        // }


        // 用二分查找优化
        let i = 0, j = tails.length - 1;
        while (i < j) {
            const mid = Math.floor((i + j) / 2);
            if (tails[mid] >= num) {
                j = mid;
            } else {
                i = mid + 1;
            }
        }
        return i;
    }
};