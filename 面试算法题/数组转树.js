/**
    通常我们有一个包含父子关系的数组，目标是将其转化为树形结构。

    示例数据：
    const arr = [
        { id: 1, parentId: null, name: 'Root' },
        { id: 2, parentId: 1, name: 'Child 1' },
        { id: 3, parentId: 1, name: 'Child 2' },
        { id: 4, parentId: 2, name: 'Grandchild 1' },
    ]

    期望结果:
    const tree = [
        {
            id: 1,
            name: 'Root',
            children: [
            {
                id: 2,
                name: 'Child 1',
                children: [{ id: 4, name: 'Grandchild 1', children: [] }],
            },
            {
                id: 3,
                name: 'Child 2',
                children: [],
            },
            ],
        },
    ]

    注意点：
    确保 parentId 为 null 的节点是根节点。
    避免循环依赖：输入数据需要合法，否则会导致死循环。
 */

// 实现思路
// 遍历数组，将每个元素存储到一个以 id 为键的 Map 中。
// 再次遍历数组，根据 parentId 将子节点挂载到父节点的 children 属性上。
// 提取 parentId 为 null 的顶层节点作为树的根。
function arrayToTree(arr) {
    const map = new Map()
    const tree = []
    arr.forEach(node => {
        map.set(node.id, { ...node, children: [] }) // 初始化每个节点的 children 属性
    });

    arr.forEach(item => {
        const parent = map.get(item.parentId)
        const curNode = map.get(item.id)
        if (parent) {
            parent.children.push(curNode)
        } else {
            tree.push(curNode)
        }
    })

    return tree
}

const arr = [
    { id: 1, parentId: null, name: 'Root' },
    { id: 2, parentId: 1, name: 'Child 1' },
    { id: 3, parentId: 1, name: 'Child 2' },
    { id: 4, parentId: 2, name: 'Grandchild 1' },
]
console.log(arrayToTree(arr))