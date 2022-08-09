// lc113. 路径总和II medium

// 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。

// 叶子节点 是指没有子节点的节点。

// 示例 1：
// 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// 输出：[[5,4,11,2],[5,8,4,5]]

// 示例 2：
// 输入：root = [1,2,3], targetSum = 5
// 输出：[]

// 示例 3：
// 输入：root = [1,2], targetSum = 0
// 输出：[]

// 提示：
// 树中节点总数在范围 [0, 5000] 内
// -1000 <= Node.val <= 1000
// -1000 <= targetSum <= 1000

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
function pathSum(root, targetSum) {
    let result = []
    let path = []
    dfs(root, targetSum, result, path);
    return result
};

function dfs(root, sum, result, path) {
    if (root == null) return

    path.push(root.val);

    if (root.left == null && root.right == null && root.val === sum) {
        // 这里不能直接存放path,因为是数组的引用，所以需要解构
        result.push([...path])
    }

    dfs(root.left, sum - root.val, result, path)
    dfs(root.right, sum - root.val, result, path)
    // 上面两步都结束之后要把path出栈进行回溯
    // 就是说上面两步最后是对叶子节点的左右空子节点做dfs然后都return，然后path.pop()去除该叶子节点
    path.pop();
}
