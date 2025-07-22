/**
 *
    如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。

    字母和数字都属于字母数字字符。

    给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。



    示例 1：

    输入: s = "A man, a plan, a canal: Panama"
    输出：true
    解释："amanaplanacanalpanama" 是回文串。
    示例 2：

    输入：s = "race a car"
    输出：false
    解释："raceacar" 不是回文串。
    示例 3：

    输入：s = " "
    输出：true
    解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
    由于空字符串正着反着读都一样，所以是回文串。


    提示：

    1 <= s.length <= 2 * 105
    s 仅由可打印的 ASCII 字符组成
 */

/**
* @param {string} s
* @return {boolean}
*/
var isPalindrome2 = function (s) {
    s = s.replace(/[^A-Za-z0-9]/gi, '').toLowerCase()

    for (let i = 0, j = s.length - 1; i < s.length; i++, j--) {
        if (s[i] !== s[j]) {
            return false
        }
    }
    return true
};



/**
 * 他人思路

    初始化一左一右两个指针 i=0，j=n−1。其中 n 是 s 的长度。

    分类讨论：

        如果 s[i] 既不是字母也不是数字，右移左指针，也就是把 i 加一。
        如果 s[j] 既不是字母也不是数字，左移右指针，也就是把 j 减一。
        否则，如果 s[i] 和 s[j] 转成小写后相等，那么把 i 加一，把 j 减一，继续判断。
        否则，s 不是回文串，返回 false。
    循环直到 i≥j 为止。最后返回 true。
 */

var isPalindrome2 = function (s) {
    let i = 0, j = s.length - 1;
    while (i < j) {
        if (!/[a-zA-Z0-9]/.test(s[i])) {
            i++;
        } else if (!/[a-zA-Z0-9]/.test(s[j])) {
            j--;
        } else if (s[i].toLowerCase() === s[j].toLowerCase()) {
            i++;
            j--;
        } else {
            return false;
        }
    }
    return true;
};