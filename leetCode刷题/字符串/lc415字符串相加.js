// leetcode 415. 字符串相加 easy

// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
// 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

// 示例 1：
// 输入：num1 = "11", num2 = "123"
// 输出："134"

// 示例 2：
// 输入：num1 = "456", num2 = "77"
// 输出："533"

// 示例 3：
// 输入：num1 = "0", num2 = "0"
// 输出："0"

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function addStrings(num1, num2) {
    let len1 = num1.length - 1
    let len2 = num2.length - 1
    let add = 0
    const result = []

    while (len1 >= 0 || len1 >= 0 || add > 0) {
        const x = len1 >= 0 ? num1.charAt(len1) - '0' : 0
        const y = len1 >= 0 ? num1.charAt(len2) - '0' : 0
        const sum = x + y + add
        result.push(sum % 10)
        add = Math.floor(sum / 10)

        len1--
        len2--
    }

    return result.reverse().join('')
}