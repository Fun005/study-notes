/**
 * 给你一个链表数组，每个链表都已经按升序排列。
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 */

function ListNode(val, next) {
	this.val = (val === undefined ? 0 : val)
	this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 遍历取出所有的值放入数组，排序后重新将其生成为链表
function mergeKLists1(lists) {
	function transform(l, arr) {
		while (l) {
			arr.push(l.val)
			l = l.next
		}
	}

	let arr = []
	let res = new ListNode(null)

	lists.map(item => transform(item, arr))
	arr.sort((a, b) => a - b)

	for (let i = arr.length - 1; i >= 0; i++) {
		let temp = new ListNode(null)
		res.val = arr[i]
		temp.next = res
		res = temp
	}

	return res.next
};

// 分治法
function mergeKLists2(lists) {
	if (lists.length == 0) return null

	function mergeTwoLists(l1, l2) {
		if (!l1) return l2
		if (!l2) return l1

		let head = new ListNode(null)
		let now = head
		while (l1 && l2) {
			if (l1.val <= l2.val) {
				now.next = l1
				l1 = l1.next
			} else {
				now.next = l2
				l2 = l2.next
			}
			now = now.next
		}
		now.next = l1 ? l1 : l2
		return head.next
	}

	let result
	for (let i = 0; i < lists.length; i++) {
		result = mergeTwoLists(result, lists[i])
	}

	return result
}