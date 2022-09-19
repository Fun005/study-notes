// 假设链表中每一个节点的值都在 0 - 9 之间，那么链表整体就可以代表一个整数。
// 给定两个这种链表，请生成代表两个整数相加值的结果链表。
// 数据范围：0≤n,m≤1000000，链表任意值 0≤val≤9
// 要求：空间复杂度 O(n)，时间复杂度 O(n)

// 例如：链表 1 为 9->3->7，链表 2 为 6->3，最后生成新的结果链表为 1->0->0->0。

// 示例1
// 输入：
// [9,3,7],[6,3]
// 返回值：
// {1,0,0,0}

// 示例2
// 输入：
// [0],[6,3]
// 返回值：
// {6,3}

// 既然链表每个节点表示数字的每一位，那相加的时候自然可以按照加法法则，从后往前依次相加。但是，链表是没有办法逆序访问的，这是我们要面对第一只拦路虎。解决它也很简单，既然从后往前不行，那从前往后总是可行的吧，将两个链表反转一 下：

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
// 即可得到个十百千……各个数字从前往后的排列，相加结果也是个位在前，怎么办？再次反转，结果不就正常了。

// 具体做法：

// step 1：任意一个链表为空，返回另一个链表就行了，因为链表为空相当于0，0加任何数为0，包括另一个加数为0的情况。
// step 2：相继反转两个待相加的链表，反转过程可以参考反转链表。
// step 3：设置返回链表的链表头，设置进位carry=0.
// step 4：从头开始遍历两个链表，直到两个链表节点都为空且carry也不为1. 每次取出不为空的链表节点值，为空就设置为0，将两个数字与carry相加，然后查看是否进位，将进位后的结果（对10取模）加入新的链表节点，连接在返回链表后面，并继续往后遍历。
// step 5：返回前将结果链表再反转回来。

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
 * @param head1 ListNode类 
 * @param head2 ListNode类 
 * @return ListNode类
 */

//  首先这个链表的相加是从尾部开始，而链表的遍历是从链表头部开始
//  所以我们就需要先将两个链表都翻转一下
//  然后进行链表的相加操作
//  相加的时候注意数字相加的进位问题就行了
//  当处理完毕链表相加之后，还有一个注意点就是，进位数是否为0
//  如果不为0，则需要将进位数添加到链表尾部
//  最后将结果链表再次翻转即可
export function addInList(head1: ListNode, head2: ListNode): ListNode {
    if (!head1) return head2
    if (!head2) return head1

    // 翻转链表
    const reverseListNode = (node: ListNode) => {
        let prev = null
        let curNode = node
        while (curNode) {
            const next = curNode.next
            curNode.next = prev
            prev = curNode
            curNode = next
        }
        return prev
    }

    let p1 = reverseListNode(head1)
    let p2 = reverseListNode(head2)

    let res = new ListNode()
    let temp = res
    let carry = 0

    while (p1 || p2) {
        const v1 = p1 ? p1.val : 0
        const v2 = p2 ? p2.val : 0

        const sum = v1 + v2 + carry
        const curVal = sum % 10
        carry = sum >= 10 ? Math.floor(sum / 10) : 0
        temp.next = new ListNode(curVal)

        if (p1) p1 = p1.next
        if (p2) p1 = p2.next
        temp = temp.next
    }

    temp.next = carry === 0 ? null : new ListNode(carry)

    return reverseListNode(res.next)
}
