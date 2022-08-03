// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
// 请你判断是否可以利用字典中出现的单词拼接出 s 。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用

// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
//      注意，你可以重复使用字典中的单词。

// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false

// 1 <= s.length <= 300
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 20
// s 和 wordDict[i] 仅有小写英文字母组成
// wordDict 中的所有字符串 互不相同


// DFS、BFS、动态规划

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
	const wordSet = new Set(wordDict)
	const len = s.length
	const dp = new Array(len + 1).fill(false)

	dp[0] = true

	for(let i = 1; i <= len; i++) {
		for(let j = i -1;j >= 0; j--) {
			const suffix = s.slice(j, i)
			if(wordSet.has(suffix) && dp[j]) {
				dp[i] = true
				break;
			}
		}
	}

	return dp[len]
};