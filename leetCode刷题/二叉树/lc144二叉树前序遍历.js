/**

给你二叉树的根节点 root ，返回它节点值的 前序 遍历。



示例 1：

输入：root = [1,null,2,3]

输出：[1,2,3]

解释：



示例 2：

输入：root = [1,2,3,4,5,null,8,null,null,6,7,9]

输出：[1,2,4,5,6,7,3,8,9]

解释：



示例 3：

输入：root = []

输出：[]

示例 4：

输入：root = [1]

输出：[1]



提示：

树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100


进阶：递归算法很简单，你可以通过迭代算法完成吗？


 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 递归
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal1 = function (root) {
    const res = []

    const recursion = (node) => {
        if (node) {
            res.push(node.val)
            recursion(node.left)
            recursion(node.right)
        }
    }

    recursion(root)
    return res
};


// 迭代
var preorderTraversal2 = function (root) {
    const res = []
    const stack = []

    while (root || stack.length) {
        while (root) {
            res.push(root.val)
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        root = root.right
    }
    return res
}