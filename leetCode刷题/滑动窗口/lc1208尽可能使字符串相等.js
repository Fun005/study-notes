// 给你两个长度相同的字符串，s 和 t。

// 将 s 中的第 i 个字符变到 t 中的第 i 个字符需要 |s[i] - t[i]| 的开销（开销可能为 0），也就是两个字符的 ASCII 码值的差的绝对值。

// 用于变更字符串的最大预算是 maxCost。在转化字符串时，总开销应当小于等于该预算，这也意味着字符串的转化可能是不完全的。

// 如果你可以将 s 的子字符串转化为它在 t 中对应的子字符串，则返回可以转化的最大长度。

// 如果 s 中没有子字符串可以转化成 t 中对应的子字符串，则返回 0。


/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring1 = function(s, t, maxCost) {
	if(s.length === 0) return 0
	const len = s.length
	let cost = 0
	let left = 0
	let right = 0
	let res = 0

	const getCost = (i) => {
		return Math.abs(s[i].charCodeAt() - t[i].charCodeAt())
	}

	while(right < len) {
		cost += getCost(right++)
		while(left <= right && cost > maxCost) {
			cost -= getCost(left++)
		}
		res = Math.max(res, right - left)
	}

	return res

};

var equalSubstring2 = function(s, t, maxCost) {
    const n = s.length;
    const diff = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        diff[i] = Math.abs(s[i].charCodeAt() - t[i].charCodeAt());
    }
    let maxLength = 0;
    let start = 0, end = 0;
    let sum = 0;
    while (end < n) {
        sum += diff[end];
        while (sum > maxCost) {
            sum -= diff[start];
            start++;
        }
        maxLength = Math.max(maxLength, end - start + 1);
        end++;
    }
    return maxLength;
};

