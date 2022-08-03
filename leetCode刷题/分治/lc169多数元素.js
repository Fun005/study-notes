/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。
 * 多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 *
 * n == nums.length
 * 1 <= n <= 5 * 104
 * -10^9 <= nums[i] <= 10^9
 */

/**
 * 分治法
 * 不断从数组的中间进行递归分割，直到每个区间的个数是1，然后向上合并左右区间个数较多的数，向上返回。
 * 时间复杂度：O(nlogn)，不断二分，复杂度是logn，二分之后每个区间需要线性统计left与right的个数，复杂度是n。
 * 空间复杂度：O(logn)，递归栈的消耗，不断二分。

 * @param {number[]} nums
 * @return {number}
 */
function majorityElement (nums) {
    const getCount = (num, lo, hi) => {
    	// 统计lo到hi之间num的数量
    	let count = 0

    	for(let i = lo; i <= hi; i++) {
    		if(nums[i] === num) count++
    	}

     	return count;
    }

    const getMode = (lo, hi) => {
    	if(lo == hi) return nums[lo]

    	// 拆分成更小的区间
    	let mid = Math.floor((lo + hi)/2)
    	let left = getMode(lo, mid)
    	let right = getMode(mid+1, hi)

    	if(left == right) return left

    	let leftCount = getCount(left, lo, hi) // 统计区间内left的个数
    	let rightCount = getCount(right, lo, hi) // 统计区间内left的个数

    	return leftCount > rightCount ? left : right //返回left和right中个数多的那个
    }

    return getMode(0, nums.length - 1)
};


/**
 * 方法1.排序法
 * 排序数组，如果有一个数字出现的频率大于n/2，则在数组nums.length / 2的位置就是这个数
 */
function majorityElement1(nums) {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
};

/**
 * 方法2.哈希表
 * 循环数组，用哈希表存储数字和对应的个数，如果数字出现的个数大于n/2则返回这个数
 */
function majorityElement2(nums) {
    let half = nums.length / 2;
    let obj = {};
    for (let num of nums) {
        obj[num] = (obj[num] || 0) + 1;
        if (obj[num] > half) return num;
    }
};

/**
 * 方法3 map,计数
 */
function majorityElement3(nums) {
    const len = nums.length
    if(len==1) return nums[0]
    const map = new Map()
    for(let i = 0;i < len; i++) {
		if(map.get(nums[i])) {
			let times = map.get(nums[i])
			times++
			if(times > len/2) {
				return nums[i]
			}
            map.set(nums[i],times)
		} else {
			map.set(nums[i],1)
		}
	}
};

