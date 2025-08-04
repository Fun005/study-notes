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
    // 指向 num1 的末尾
    let i = num1.length - 1
    // 指向 num2 的末尾
    let j = num2.length - 1
    // 保存进位
    let curry = 0
    // 用数组收集结果位，最后再拼接
    const result = []

    // 当 num1、num2 还有数字，或者还有进位时继续循环
    while (i >= 0 || j >= 0 || curry > 0) {
        const digit1 = i >= 0 ? parseInt(num1[i]) : 0 // 取出 num1 当前位
        const digit2 = j >= 0 ? parseInt(num2[j]) : 0 // 取出 num2 当前位
        const sum = digit1 + digit2 + curry // 当前位相加再加上进位
        result.push(sum % 10) // 把当前位的数字存入结果
        curry = Math.floor(sum / 10) // 更新进位

        i--
        j--
    }
    // 最后把结果数组反转拼接成字符串
    return result.reverse().join('')
}