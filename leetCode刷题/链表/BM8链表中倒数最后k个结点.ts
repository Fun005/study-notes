
// 输入一个长度为 n 的链表，设链表中的元素的值为 ai ，返回该链表中倒数第k个节点。
// 如果该链表长度小于k，请返回一个长度为 0 的链表。

// 示例1
// 输入：
// { 1, 2, 3, 4, 5 }, 2
// 返回值：
// { 4, 5 }

// 说明：
// 返回倒数第2个节点4，系统会打印后面所有的节点来比较。

// 示例2
// 输入：
// { 2 }, 8
// 返回值：
// { }

// 知识点：双指针

// 双指针指的是在遍历对象的过程中，不是普通的使用单个指针进行访问，而是使用两个指针（特殊情况甚至可以多个），两个指针或是同方向访问两个链表、或是同方向访问一个链表（快慢指针）、或是相反方向扫描（对撞指针），从而达到我们需要的目的。

// 思路：

// 我们无法逆序遍历链表，就很难得到链表的倒数第kkk个元素，那我们可以试试反过来考虑，如果当前我们处于倒数第kkk的位置上，即距离链表尾的距离是kkk，那我们假设双指针指向这两个位置，二者同步向前移动，当前面个指针到了链表头的时候，两个指针之间的距离还是kkk。虽然我们没有办法让指针逆向移动，但是我们刚刚这个思路却可以正向实施。

// 具体做法：

// step 1：准备一个快指针，从链表头开始，在链表上先走kkk步。
// step 2：准备慢指针指向原始链表头，代表当前元素，则慢指针与快指针之间的距离一直都是kkk。
// step 3：快慢指针同步移动，当快指针到达链表尾部的时候，慢指针正好到了倒数kkk个元素的位置。

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
 *
 * @param pHead ListNode类
 * @param k int整型
 * @return ListNode类
 */
export function FindKthToTail(pHead: ListNode, k: number): ListNode {
    //  设链表长度为len, 当我们需要第k个结点时, 我们可以通过跳跃k次来得到, 而当我们需要倒数第k个结点时, 我们实际上需要的是第len-k个结点
    //  因此, 我们可以先获取到一个长度为k的间隔, 设间隔的尾部为n, 则间隔的头部为n-k, 当间隔到达len时, 间隔的头部就为len-k
    //  因此, 我们可以首先让一个指针p1跳跃k次, 然后让另一个指针p2与p1同时向后跳跃, 当p1到达表尾, p2就是所求的倒数第k个元素

    // 1、初始化快指针
    let fastPos = pHead
    for (let i = 0; i < k; i++) {
        // 当快指针在去往第k个结点的途中到达表尾, 则表示链表长度小于k, 由题意知: 如果该链表长度小于k，请返回一个长度为 0 的链表。
        if (fastPos === null) return fastPos
        fastPos = fastPos.next
    }

    // 走到这里说明存在倒数第k个结点
    let slowPos = pHead
    while (fastPos !== null) {
        fastPos = fastPos.next
        slowPos = slowPos.next
    }
    //  快指针到达表尾, 返回慢指针所指向的倒数第k个元素
    return slowPos
}