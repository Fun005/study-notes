// 描述
// 给定一个链表，删除链表的倒数第 n 个节点并返回链表的头指针
// 例如，
// 给出的链表为: 1\to 2\to 3\to 4\to 51→2→3→4→5, n= 2n=2.
// 删除了链表的倒数第 nn 个节点之后,链表变为1\to 2\to 3\to 51→2→3→5.

// 数据范围： 链表长度 0\le n \le 10000≤n≤1000，链表中任意节点的值满足 0 \le val \le 1000≤val≤100
// 要求：空间复杂度 O(1)O(1)，时间复杂度 O(n)O(n)
// 备注：
// 题目保证 nn 一定是有效的
// 示例1
// 输入：
// {1,2},2    

// 返回值：
// {2} 

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
 * @param head ListNode类 
 * @param n int整型 
 * @return ListNode类
 */
export function removeNthFromEnd(head: ListNode, n: number): ListNode {

    let fastPos: ListNode = head
    let slowPos: ListNode = head

    for (let i = 0; i < n; i++) {
        fastPos = fastPos.next
    }

    if (fastPos === null) return head.next

    let prevPos: ListNode
    while (fastPos != null) {
        fastPos = fastPos.next
        prevPos = slowPos
        slowPos = slowPos.next
    }

    prevPos.next = slowPos.next

    return head
}