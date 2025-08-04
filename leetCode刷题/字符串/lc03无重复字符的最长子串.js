/**
 *  leetcode03 无重复字符的最长子串 medium
    给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。

    示例 1:

    输入: s = "abcabcbb"
    输出: 3
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
    示例 2:

    输入: s = "bbbbb"
    输出: 1
    解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
    示例 3:

    输入: s = "pwwkew"
    输出: 3
    解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
        请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。


    提示：

    0 <= s.length <= 5 * 104
    s 由英文字母、数字、符号和空格组成
 */

/**
* @param {string} s
* @return {number}
*/
var lengthOfLongestSubstring = function (s) {
    if (!s) return 0
    let left = right = maxLength = 0
    const set = new Set()

    while (right < s.length) {
        if (set.has(s[right])) {
            // 如果 set 中存在当前字符串
            // 循环处理，左指针++， set 删除左边字符串
            while (set.has(s[right])) {
                set.delete(s[left])
                left++
            }

            set.add(s[right])
            right++
        } else {
            // 如果 set 中不存在当前字符串
            set.add(s[right])
            right++
            maxLength = Math.max(maxLength, set.size)
        }
    }

    return maxLength
};
