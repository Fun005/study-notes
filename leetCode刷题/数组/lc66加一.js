/**
    给定一个表示 大整数 的整数数组 digits，其中 digits[i] 是整数的第 i 位数字。这些数字按从左到右，从最高位到最低位排列。这个大整数不包含任何前导 0。

    将大整数加 1，并返回结果的数字数组。



    示例 1：

    输入：digits = [1,2,3]
    输出：[1,2,4]
    解释：输入数组表示数字 123。
    加 1 后得到 123 + 1 = 124。
    因此，结果应该是 [1,2,4]。
    示例 2：

    输入：digits = [4,3,2,1]
    输出：[4,3,2,2]
    解释：输入数组表示数字 4321。
    加 1 后得到 4321 + 1 = 4322。
    因此，结果应该是 [4,3,2,2]。
    示例 3：

    输入：digits = [9]
    输出：[1,0]
    解释：输入数组表示数字 9。
    加 1 得到了 9 + 1 = 10。
    因此，结果应该是 [1,0]。


    提示：

    1 <= digits.length <= 100
    0 <= digits[i] <= 9
    digits 不包含任何前导 0。
 */

/**
 * @param {number[]} digits
 * @return {number[]}
 */

/**
    一个整数加1，无论进不进位，都是从尾部开始加1的
    不进位
        末尾加1 < 10，加后直接返回，对应数组末尾元素+1即可
    进位
        对需要进位的原数组中的位的数修改值为0
        进位位数 < 整数位数
            数组相应位置元素+1即可
            何时+1？
                ==9
                即加1后模10为0，说明原位数字为9
        进位位数 = 整数位数
            例如9，99，999，9999
            此时直接变为10，100，1000，10000即可
                在遍历中修改
                    判断是否能遍历到整数的位数，如果能，原数组直接左边插入1个1即可
                在结果中修改
                    直接重新新建一个原数组长度加1长度的新数组，设置首元素为1，其余元素为0，返回新数组即可
 */

var plusOne1 = function (digits) {
    const len = digits.length
    for (i = len - 1; i >= 0; i--) {
        digits[i] = (digits[i] + 1) % 10
        if (digits[i] !== 0) return digits
    }

    digits.unshift(1)
    return digits
};

var plusOne2 = function (digits) {
    for (let i = digits.lnegth - 1; i >= 0; i--) {
        if (digits[i] === 9) {
            digits[i] = 0
        } else {
            digits[i] += 1
            return digits
        }
    }
    digits.unshift(1)
    return digits
}

var plusOne3 = function (digits) {
    const len = digits.length
    digits[len - 1]++
    for (let i = len - 1; i >= 0; i--) {
        if (digits[i] === 10) {
            digits[i] = 0
            if (i === 0) {
                digits.unshift(1)
            } else {
                digits[i - 1]++
            }
        }
    }
    return digits
}