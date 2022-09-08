// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

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
