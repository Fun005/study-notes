// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
//  

// 示例 1：

// 输入：s = "()"
// 输出：true
// 示例 2：

// 输入：s = "()[]{}"
// 输出：true
// 示例 3：

// 输入：s = "(]"
// 输出：false
// 示例 4：

// 输入：s = "([)]"
// 输出：false
// 示例 5：

// 输入：s = "{[]}"
// 输出：true
//  

// 提示：

// 1 <= s.length <= 104
// s 仅由括号 '()[]{}' 组成

function isValid(s) {
    if (s.length < 2) return false

    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    const stack = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] in map) {
            stack.push(map[s[i]])
        } else {
            if (s[i] !== stack.pop()) return false
        }
    }

    return stack.length === 0
}
