// lc03.medium
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:
// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 示例 2:
// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

// 示例 3:
// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 提示：
// 0 <= s.length <= 5 * 104
// s 由英文字母、数字、符号和空格组成

/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
	if (s === '') return 0

	const len = s.length
	const set = new Set()
	let i = 0, j = 0, maxLength = 0

	for (i; i < len; i++) {
		if (set.has(s[i])) {
			while (set.has(s[i])) {
				set.delete(s[j])
				j++
			}
			set.add(s[i])
		} else {
			set.add(s[i])
			maxLength = Math.max(maxLength, set.size)
		}
	}

	return maxLength
}
