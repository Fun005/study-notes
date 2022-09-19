// 将一个节点数为 size 链表 m 位置到 n 位置之间的区间反转，要求时间复杂度 O(n)O(n)，空间复杂度 O(1)O(1)。
// 例如：
// 给出的链表为 1-> 2 -> 3 -> 4 -> 5 -> NULL, m=2,n=4m=2,n=4,
// 返回 1-> 4-> 3-> 2-> 5-> NULL1

// 数据范围： 链表长度 0<size≤1000，0<m≤n≤size，链表中每个节点的值满足 ∣val∣≤1000
// 要求：时间复杂度 O(n)O(n) ，空间复杂度 O(n)O(n)
// 进阶：时间复杂度 O(n)O(n)，空间复杂度 O(1)O(1)

// 在学会了反转链表之后，要解决这个问题就很简单了，前一题是整个链表反转，这一题是部分反转，这上一题就是这道题的前置问题。
// 那我们肯定是要先找到了第m个位置才能开始反转链表，而反转的部分就是从第m个位置到第n个位置，反转这部分的时候就参照反转链表
// while(cur != null){
//     //断开链表，要记录后续一个
//     ListNode temp = cur.next; 
//     //当前的next指向前一个
//     cur.next = pre; 
//     //前一个更新为当前
//     pre = cur; 
//     //当前更新为刚刚记录的后一个
//     cur = temp; 
// }

// 具体做法：
// 1、在链表前加一个表头，后续返回时去掉，因为如果要从链表头的位置开始反转，在多了一个表头的情况下就能保证第一个节点永远不会反转，不会到后面去。
// 2、使用两个指针，一个指向当前节点，一个指向前序节点。
// 3、依次遍历链表，到第m个的位置。
// 4、对于从m到n这些个位置的节点，依次断掉指向后续的指针，反转指针方向。
// 5、返回时去掉我们添加的表头。


// 首先需要找到第 m-1 和第 n+1 节点，分别用 start 和 end 保存
// m - 1表示：开始反转的前一个节点，注意如果m = 1，那么从head节点就开始反转了，start就是null
// n + 1表示：结束反转的后一个节点，可能是一个节点，也可能是null，不过都一样

// 第一个for循环就是寻找start和end

// 接下来的while循环里，需要三个指针，prev，cur，next去记录每次循环的节点，然后通过 cur.next = pre 实现反转。这里需要对 m === 1 分开讨论

// class ListNode {
//     val: number
//     next: ListNode | null
//     constructor(val?: number, next?: ListNode | null) {
//         this.val = (val === undefined ? 0 : val)
//         this.next = (next === undefined ? null : next)
//     }
// }

// interface ILinkListNode {
//     value: number
//     next?: ILinkListNode
//     prev?: ILinkListNode
// }

/**
  *
  * @param head ListNode类
  * @param m int整型
  * @param n int整型
  * @return ListNode类
  */
function reverseBetween(head, m, n) {
    // 如果 m === n，则无需翻转
    // 如果只有一个结点，也不需要翻转
    if (m === n || head === null || head.next === null) return head

    // start 指向开始翻转结点的前一个结点，即 m - 1
    // end 指向 n + 1
    let cur = head
    let start = null
    let end = null

    // 寻找start和end
    for (let i = 1; i <= n; i++) {
        if (i === m - 1) {
            start = cur
        }
        cur = cur.next
    }
    end = cur

    let prev = null
    let next = null

    // 如果起始结点不是头结点，说明start有值
    if (m > 1) {
        cur = start.next
        while (cur !== end) {
            next = cur.next
            cur.next = prev
            prev = cur
            cur = next
        }
        start.next.next = end
        start.next = prev
    } else {
        // 起始结点就是头结点，start没有值
        cur = head
        while (cur !== end) {
            next = cur.next
            cur.next = prev
            prev = cur
            cur = next
        }
        head.next = end
        head = prev
    }
    return head
}