// 输入两个递增的链表，单个链表的长度为n，合并这两个链表并使新链表中的节点仍然是递增排序的。
// 数据范围： 0≤n≤1000，−1000≤节点值≤1000
// 要求：空间复杂度 O(1)，时间复杂度 O(n)

// 如输入{1,3,5},{2,4,6}时，合并后的链表为{1,2,3,4,5,6}，所以对应的输出为{1,2,3,4,5,6}，
// 或输入{-1,2,4},{1,3,4}时，合并后的链表为{-1,1,2,3,4,4}，所以对应的输出为{-1,1,2,3,4,4}，

// 示例1
// 输入：
// {1,3,5},{2,4,6}

// 返回值：
// {1,2,3,4,5,6}

// 示例2
// 输入：
// {},{}

// 返回值：
// {}

// 示例3
// 输入：
// {-1,2,4},{1,3,4}

// 返回值：
// {-1,1,2,3,4,4}


// 知识点：双指针

// 双指针指的是在遍历对象的过程中，不是普通的使用单个指针进行访问，而是使用两个指针（特殊情况甚至可以多个），两个指针或是同方向访问两个链表、或是同方向访问一个链表（快慢指针）、或是相反方向扫描（对撞指针），从而达到我们需要的目的。

// 思路：

// 这道题既然两个链表已经是排好序的，都是从小到大的顺序，那我们要将其组合，可以使用归并排序的思想：每次比较两个头部，从中取出最小的元素，然后依次往后。这样两个链表依次往后，我们肯定需要两个指针同方向访问才能实现。

// 具体过程：

// step 1：判断空链表的情况，只要有一个链表为空，那答案必定就是另一个链表了，就算另一个链表也为空。
// step 2：新建一个空的表头后面连接两个链表排序后的节点，两个指针分别指向两链表头。
// step 3：遍历两个链表都不为空的情况，取较小值添加在新的链表后面，每次只把被添加的链表的指针后移。
// step 4：遍历到最后肯定有一个链表还有剩余的节点，它们的值将大于前面所有的，直接连在新的链表后面即可。

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
 * @param pHead1 ListNode类 
 * @param pHead2 ListNode类 
 * @return ListNode类
 */

/**
 * 解法一：迭代
 * 思路：
 * （1）新建一个空的表头后面连接两个链表排序后的结点。
 * （2）遍历两个链表都不为空的情况，取较小值添加在新的链表后面，每次只把被添加的链表的指针后移。
 * （3）遍历到最后肯定有一个链表还有剩余的结点，它们的值将大于前面所有的，直接连在新的链表后面即可。
 * 时间复杂度: O(n)，最坏情况遍历2 * n个结点
 * 空间复杂度: 0(1)，无额外空间使用，新建的链表属于返回必要空间
 */
export function Merge1(pHead1: ListNode, pHead2: ListNode): ListNode {
    // write code here
    if (pHead1 == null) return pHead2
    if (pHead2 == null) return pHead1

    let head: ListNode = new ListNode() // 加一个表头
    let cur: ListNode = head

    while (pHead1 != null && pHead2 != null) {
        if (pHead1.val <= pHead2.val) {// 取较小值的结点
            cur.next = pHead1
            pHead1 = pHead1.next // 移动取值的指针
        } else {
            cur.next = pHead2
            pHead2 = pHead2.next
        }
        cur = cur.next // 指针后移
    }

    if (pHead1 != null) cur.next = pHead1
    if (pHead2 != null) cur.next = pHead2

    return head.next // 返回值去掉表头
}

/**
 * 解法二：递归
 * 思路：
 * （1）每次比较两个链表当前结点的值，然后取较小值的链表指针往后，另一个不变送入递归中。
 * （2）递归回来的结果我们要加在当前较小值的结点后面，相当于不断在较小值后面添加结点。
 * （3）递归的终止是两个链表为空。
 * 时间复杂度: O(n)，最坏相当于遍历两个链表每个结点一次
 * 空间复杂度: O(n), 递归栈长度最大为 n
 */

export function Merge2(pHead1: ListNode, pHead2: ListNode): ListNode {
    if (pHead1 == null) return pHead2
    if (pHead2 == null) return pHead1

    if (pHead1.val <= pHead2.val) {
        pHead1.next = Merge2(pHead1.next, pHead2)
        return pHead1
    } else {
        pHead2.next = Merge2(pHead1, pHead2.next)
        return pHead2
    }
}