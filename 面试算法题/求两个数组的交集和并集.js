// 给两个数组，求数组的交集和并集

const arr1 = [1, 3, 4, 6, 7]
const arr2 = [2, 5, 3, 6, 1]

// 交集
function getIntersection(arr1, arr2) {
    const res = []
    const set = new Set(arr1)

    for (let i = 0; i < arr2.length; i++) {
        if (set.has(arr2[i])) {
            res.push(arr2[i])
        }
    }

    return res
}

// 并集
function getUnion(arr1, arr2) {
    const set = new Set(arr1)

    for (let i = 0; i < arr2.length; i++) {
        set.add(arr2[i])
    }

    return Array.from(set)
}