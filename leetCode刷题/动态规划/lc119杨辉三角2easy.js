/**
    给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。

    在「杨辉三角」中，每个数是它左上方和右上方的数的和。

    示例 1:

    输入: rowIndex = 3
    输出: [1,3,3,1]
    示例 2:

    输入: rowIndex = 0
    输出: [1]
    示例 3:

    输入: rowIndex = 1
    输出: [1,1]


    提示:

    0 <= rowIndex <= 33


    进阶：

    你可以优化你的算法到 O(rowIndex) 空间复杂度吗？
 */


/**
 * 我的首次提交
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow1 = function (rowIndex) {
    const ret = []

    for (let i = 0; i < rowIndex + 1; i++) {
        const row = new Array(i + 1).fill(1);
        for (let j = 1; j < row.length - 1; j++) {
            row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
        }
        ret.push(row);
    }
    return ret[rowIndex]
};

/**
 * 官方题解
 */

var getRow2 = function (rowIndex) {
    const C = new Array(rowIndex + 1).fill(0);
    for (let i = 0; i <= rowIndex; ++i) {
        C[i] = new Array(i + 1).fill(0);
        C[i][0] = C[i][i] = 1;
        for (let j = 1; j < i; j++) {
            C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
        }
    }
    return C[rowIndex];
};

/**
 * 优化
    注意到对第 i+1 行的计算仅用到了第 i 行的数据，因此可以使用滚动数组的思想优化空间复杂度。
 */

var getRow3 = function (rowIndex) {
    let pre = [], cur = [];
    for (let i = 0; i <= rowIndex; ++i) {
        cur = new Array(i + 1).fill(0);
        cur[0] = cur[i] = 1;
        for (let j = 1; j < i; ++j) {
            cur[j] = pre[j - 1] + pre[j];
        }
        pre = cur;
    }
    return pre;
};


/**
 * 进一步优化

    能否只用一个数组呢？

    递推式
    表明，当前行第 i 项的计算只与上一行第 i−1 项及第 i 项有关。因此我们可以倒着计算当前行，这样计算到第 i 项时，第 i−1 项仍然是上一行的值。

    时间复杂度：O(rowIndex2)。
    空间复杂度：O(1)。不考虑返回值的空间占用。
 */
var getRow4 = function (rowIndex) {
    const row = new Array(rowIndex + 1).fill(0);
    row[0] = 1;
    for (let i = 1; i <= rowIndex; ++i) {
        for (let j = i; j > 0; --j) {
            row[j] += row[j - 1];
        }
    }
    return row;
};

/**
 *
 * 复杂度分析
    时间复杂度：O(rowIndex)。
    空间复杂度：O(1)。不考虑返回值的空间占用。
 */
var getRow5 = function (rowIndex) {
    const row = new Array(rowIndex + 1).fill(0);
    row[0] = 1;
    for (let i = 1; i <= rowIndex; ++i) {
        row[i] = row[i - 1] * (rowIndex - i + 1) / i;
    }
    return row;
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
    对于本题，我们可以预处理 c[0] 到 c[33]，这样每次调用 getRow 都是 O(1) 时间。

 */
const c = Array.from({ length: 34 }, () => []);
for (let i = 0; i < c.length; i++) {
    c[i] = Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
        // 左上方的数 + 正上方的数
        c[i][j] = c[i - 1][j - 1] + c[i - 1][j];
    }
}

var getRow6 = function (rowIndex) {
    return c[rowIndex];
};
