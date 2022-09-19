// 描述
// 给定一个链表，请判断该链表是否为回文结构。
// 回文是指该字符串正序逆序完全一致。


// 示例1
// 输入：
// {1}
// 返回值：
// true

// 示例2
// 输入：
// {2,1}
// 返回值：
// false
// 说明：
// 2->1   

// 示例3
// 输入：
// {1,2,2,1}
// 返回值：
// true
// 说明：
// 1->2->2->1      

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
 * @param head ListNode类 the head
 * @return bool布尔型
 */

// 方法一：转成数组，前后比较
export function isPail(head: ListNode): boolean {
    // write code here
    if (head == null) return false
    if (head.next == null) return true
    const arr = []
    while (head) {
        arr.push(head.val)
        head = head.next
    }

    let start = 0, end = arr.length - 1
    while (start < end) {
        if (arr[start] !== arr[end]) return false

        start++
        end--
    }

    return true
}

// 方法二：快慢指针
// 快指针一次走两步，慢指针依次走一步，当快指针走到终点的时候，此时如果链表的长度为偶数时，此时中间节点有两个，慢指针则走到了左端点。
// 反之，慢指针则走到中间节点。（这两种情况在我们这道题目的总代吗，我们可以直接合并为一种，则第二个链表的长度比第一个链表的长度小1）

export function isPail2(head: ListNode): boolean {
    if (head == null || head.next == null) return true

    let slow = head, fast = head

    while (fast != null && fast.next != null) {
        fast = fast.next.next
        slow = slow.next
    }

    fast = slow.next // 此时，将fast指向后半段链表的头结点
    slow.next = null

    let nHead = null
    // 翻转后半链表
    while (fast != null) {
        nHead = fast.next
        fast.next = slow
        slow = fast
        fast = nHead
    }

    nHead = slow // 后半段翻转后的链表
    fast = head  // 原来的链表

    while (fast != null && nHead != null) {
        if (fast.val != nHead.val) return false

        fast = fast.next
        nHead = nHead.next
    }

    return true
}