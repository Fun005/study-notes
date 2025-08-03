/**
 * 将树形结构扁平化为数组，保留原有的层级关系。
 * 示例数据：
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

    期望结果:
    const arr = [
        { id: 1, name: 'Root', parentId: null },
        { id: 2, name: 'Child 1', parentId: 1 },
        { id: 3, name: 'Child 2', parentId: 1 },
        { id: 4, name: 'Grandchild 1', parentId: 2 },
    ]
 */

/**
 * 实现思路：
    使用递归遍历树。
    在每次递归中记录当前节点的 parentId。
    将节点及其子节点逐一添加到结果数组中。
 * @param {*} tree
 */
function treeToArray(tree, parentId = null) {
    const res = []

    tree.forEach(node => {
        const { id, name, children } = node
        res.push({ id, name, parentId })
        if (children && children.length > 0) {
            res.push(treeToArray(children, id)) // 递归调用
        }
    })

    return res
}

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
console.log(treeToArray(tree, null))