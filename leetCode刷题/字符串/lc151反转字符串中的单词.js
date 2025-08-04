/**
 *  151. 反转字符串中的单词 medium
    给你一个字符串 s ，请你反转字符串中 单词 的顺序。

    单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

    返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。

    注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。



    示例 1：

    输入：s = "the sky is blue"
    输出："blue is sky the"
    示例 2：

    输入：s = "  hello world  "
    输出："world hello"
    解释：反转后的字符串中不能存在前导空格和尾随空格。
    示例 3：

    输入：s = "a good   example"
    输出："example good a"
    解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。


    提示：

    1 <= s.length <= 104
    s 包含英文大小写字母、数字和空格 ' '
    s 中 至少存在一个 单词


    进阶：如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 O(1) 额外空间复杂度的 原地 解法
 */

/**
 * 使用 split 将字符串按空格分割成字符串数组；
 * 使用 reverse 将字符串数组进行反转；
 * 使用 join 方法将字符串数组拼成一个字符串。
* @param {string} s
* @return {string}
*/
var reverseWords = function (s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};


/**
 * 双指针法
 */
var reverseWords2 = function (s) {
    let left = 0, right = s.length - 1;

    // 去除前导空格
    while (left <= right && s[left] === ' ') {
        left++;
    }

    // 去除尾随空格
    while (left <= right && s[right] === ' ') {
        right--;
    }

    const result = [];
    let wordStart = left;

    for (let i = left; i <= right; i++) {
        if (s[i] === ' ') {
            if (i > wordStart) {
                result.unshift(s.slice(wordStart, i));
            }
            wordStart = i + 1;
        }
    }

    // 添加最后一个单词
    if (wordStart <= right) {
        result.unshift(s.slice(wordStart, right + 1));
    }

    return result.join(' ');
}

/**
    1. 使用双指针的方法，从后向前遍历字符
    2. 右端的指针遇到空格跳过，直到单词的末尾，然后将左端的指针指向右端
    3. 在2的基础上，左指针继续向前，直到遇到空格或小于0才停下（此时左右指针之间就是单词）
    4. 把单词添加到结果字符串中，然后把右指针指向左指针，开始下一轮遍历
    5. 下一轮遍历开始后，如果还有新单词，就给上一个单词后面添加一个空格
 */
var reverseWords3 = function (s) {
    let r = s.length - 1, l = r, res = ''
    while (l >= 0) {
        // 先找到单词尾部
        while (s[r] === " ") {
            r--
        }
        l = r

        // 给上次的单词后面添加空格，排除第一次
        if (l >= 0 && res) {
            res += " "
        }

        // 再找到单词头部
        while (s[l] && s[l] !== " ") {
            l--
        }

        // 遍历单词并添加
        for (let i = l + 1, j = r; i <= j; i++) {
            res += s[i]
        }

        // 跳到下一个单词
        r = l
    }
    return res
};
