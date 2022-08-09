// leetcode 93. 复原 IP 地址 medium
// 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。

// 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

function restoreIpAddresses(s) {
    let result = []

    // 复原从start开始的子串
    const dfs = (arr, start) => {
        // 满4个片段，且耗尽所有字符
        if (arr.length === 4 && start === s.length) {
            result.push(arr.join('.'))
            return
        }

        // 满4段，字符没耗尽，不用往下走了
        if (arr.length === 4 && start < s.length) return

        // 三种切割长度
        for (let i = 1; i <= 3; i++) {
            // 加上要切的长度就越界，不能切这个长度
            if (start + i - 1 >= s.length) return

            // 不能切出'0x'、'0xx'
            if (i !== 1 && s[start] === '0') return

            // 当前切出的片段
            const str = s.substring(start, start + i)

            // 不能超过255
            if (i === 3 && +str > 255) return

            // 作出选择，将片段加入arr
            arr.push(str)

            // 基于当前选择，继续选择，注意更新指针
            dfs(arr, start + i);

            // 上面一句的递归分支结束，撤销最后的选择，进入下一轮迭代，考察下一个切割长度
            arr.pop();

        }
    }

    // dfs入口
    dfs([], 0);
    return result;
}