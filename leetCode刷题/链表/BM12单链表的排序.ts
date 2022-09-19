// 给定一个节点数为n的无序单链表，对其按升序排序。

// 示例1
// 输入：
// {1,3,2,4,5}

// 返回值：
// {1,2,3,4,5}

// 示例2
// 输入：
// {-1,0,-2}

// 返回值：
// {-2,-1,0}

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 
 * @param head ListNode类 the head node
 * @return ListNode类
 */
export function sortInList(head: ListNode): ListNode {
    // write code here
    let arr = []
    let cur = head
    while (cur) {
        arr.push(cur.val)
        cur = cur.next
    }
    arr.sort((a, b) => a - b)
    cur = head
    for (let i = 0; i < arr.length; i++) {
        cur.val = arr[i]
        cur = cur.next
    }
    return head
}