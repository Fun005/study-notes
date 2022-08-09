// leetcode 43. 字符串相乘 medium

// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

// 注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。

// 示例 1:
// 输入: num1 = "2", num2 = "3"
// 输出: "6"

// 示例 2:
// 输入: num1 = "123", num2 = "456"
// 输出: "56088"

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function multiply(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0'

    let len1 = num1.length
    let len2 = num2.length
    let result = new Array(len1 + len2).fill(0)

    // num1 x num2 结果 result 最大总位数为 M+N
    for (let i = len1 - 1; i >= 0; i--) {
        for (let j = len2 - 1; j >= 0; j--) {
            // 从个位数开始，逐步相乘
            // 若num1[i] x num2[j] 的结果为 temp (位数为两位，"0x","xy"的形式)，则其第一位位于 result[i+j]，第二位位于 result[i+j+1]。

            const v = num1[i] * num2[j]
            const sum = v + result[i + j + 1]

            result[i + j] += Math.floor(sum / 10)
            result[i + j + 1] = sum % 10
        }
    }
    if (result[0] === 0) result.shift()
    return result.join('')
};