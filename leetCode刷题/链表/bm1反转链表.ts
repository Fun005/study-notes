
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


// 解法一：迭代
// 链表的核心操作就是指针
// 让next保存头结点下一个值，cur当前结点初始为head, prev为前一个结点，初始为null

// 每一次迭代需要4步操作
// 1、用next保存下一个结点的值 ===> next = cur.next
// 2、让下一个结点指向前一个结点prev ===> cur.next = prev
// 3、prev前进一个结点，也就是cur ===> prev = cur
// 4、cur前进一个结点，也就是next ===> cur = next

export function reverseList(head: ListNode): ListNode | null {
    let prev: ListNode | null = null
    let cur: ListNode = head
    let next: ListNode = head

    while (cur) {
        // @ts-ignore
        next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    return prev
}


// 解法二、递归
export function reverseList2(head: ListNode): ListNode | null {
    if (head == null || head.next == null) return head

    let next: ListNode = head.next
    // @ts-ignore
    let prev: ListNode = reverseList2(next)

    next.next = head
    head.next = null

    return prev
}