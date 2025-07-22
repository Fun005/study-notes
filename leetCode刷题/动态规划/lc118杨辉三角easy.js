/**
    给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
    在「杨辉三角」中，每个数是它左上方和右上方的数的和。

    示例 1:

    输入: numRows = 5
    输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
    示例 2:

    输入: numRows = 1
    输出: [[1]]


    提示:

    1 <= numRows <= 30
 */

/**
 * 我的首次提交
* @param {number} numRows
* @return {number[][]}
*/
var generate1 = function (numRows) {

    if (numRows === 1) return [[1]]
    if (numRows === 2) return [[1], [1, 1]]

    let res = [[1], [1, 1]]

    for (let i = 2; i < numRows; i++) {
        let item = []
        const lineLength = i + 1
        for (let j = 0; j < lineLength; j++) {
            if (j === 0) {
                item[0] = 1
            } else if (j === lineLength - 1) {
                item[lineLength - 1] = 1
            } else {
                item[j] = res[i - 1][j - 1] + res[i - 1][j]
            }
        }
        res.push(item)
    }

    return res

};

/**
 * 官方题解
 */

var generate2 = function (numRows) {
    const ret = [];

    for (let i = 0; i < numRows; i++) {
        const row = new Array(i + 1).fill(1);
        for (let j = 1; j < row.length - 1; j++) {
            row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
        }
        ret.push(row);
    }
    return ret;
};


/**
 * 他人思路
 *
 * 把杨辉三角的每一排左对齐：

    [1]
    [1,1]
    [1,2,1]
    [1,3,3,1]
    [1,4,6,4,1]


    设要计算的二维数组是 c，计算方法如下：

    每一排的第一个数和最后一个数都是 1，即 c[i][0]=c[i][i]=1。
    其余数字，等于左上方的数，加上正上方的数，即 c[i][j]=c[i−1][j−1]+c[i−1][j]。例如 4=1+3, 6=3+3 等。


 */
var generate3 = function (numRows) {
    const c = Array(numRows);
    for (let i = 0; i < numRows; i++) {
        c[i] = Array(i + 1);
        c[i][0] = c[i][i] = 1;
        for (let j = 1; j < i; j++) {
            // 左上方的数 + 正上方的数
            c[i][j] = c[i - 1][j - 1] + c[i - 1][j];
        }
    }
    return c;
};