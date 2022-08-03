### NO.1 数组去重并返回新数组长度

给定一个排序数组，你需要在**原地**删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在**原地修改输入数组**并在使用 O(1) 额外空间的条件下完成。

**示例 1:**

```
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2:**

```javascript
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**“引用”**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```javascript
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

**答案：**

```javascript
var removeDuplicates = function(nums) {
    const ol = nums.length
    const len = [...new Set(nums)].length;
    nums.splice(0, ol, ...new Set(nums))
    return len
};
removeDuplicates([0,0,1,1,1,2,2,3,3,4])
```

### NO.2 获取数组中心索引

给定一个整数类型的数组 `nums`，请编写一个能够返回数组**“中心索引”**的方法。

我们是这样定义数组**中心索引**的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。

如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

**示例 1:**

```javascript
输入: 
nums = [1, 7, 3, 6, 5, 6]
输出: 3
解释: 
索引3 (nums[3] = 6) 的左侧数之和(1 + 7 + 3 = 11)，与右侧数之和(5 + 6 = 11)相等。
同时, 3 也是第一个符合要求的中心索引。
```

**示例 2:**

```javascript
输入: 
nums = [1, 2, 3]
输出: -1
解释: 
数组中不存在满足此条件的中心索引。
```

**说明:**

- `nums` 的长度范围为 `[0, 10000]`。
- 任何一个 `nums[i]` 将会是一个范围在 `[-1000, 1000]`的整数。

**思路:**

该元素左边总和等于该元素右边总和即为“中心索引”，如果每次遇到一个数把其左边全部加起来，再把右边全部加起来，时间复杂度为 `O(n^2)`，超时 。
考虑优化，既然左边右边数不变，可以开两个数组分别保存“当前元素左边元素总和”和“当前元素右边总和”，之后再遍历时，直接比较两数组当前值是否相等，依然超时 。
再考虑，既然左边的和都求出来了，右边的和不就是 总和 - 左边的元素总和 - 当前数组值，省去了计算“当前元素右边总和”。

**答案：**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  let sumLeft = 0
  let sum = 0
  let sumRight = 0
  const len = nums.length
  for (let i = 0; i < len; i++) {
    sum += nums[i]
  }
  for (let i = 0; i < len; i++) {
    if(i == 0) {
      sumLeft = 0
    } else {
      sumLeft += nums[i-1]
    }
    sumRight = sum - sumLeft - nums[i]
    if(sumLeft === sumRight) {
      return i
    }
  }
  return -1
}
```

### NO.3 至少是其他数字两倍的最大数

****

在一个给定的数组`nums`中，总是存在一个最大元素 。

查找数组中的最大元素是否至少是数组中每个其他数字的两倍。

如果是，则返回最大元素的索引，否则返回-1。

**示例 1:**

```javascript
输入: nums = [3, 6, 1, 0]
输出: 1
解释: 6是最大的整数, 对于数组中的其他整数,
6大于数组中其他元素的两倍。6的索引是1, 所以我们返回1.
```

**示例 2:**

```javascript
输入: nums = [1, 2, 3, 4]
输出: -1
解释: 4没有超过3的两倍大, 所以我们返回 -1.
```

**提示:**

1. `nums` 的长度范围在`[1, 50]`.
2. 每个 `nums[i]` 的整数范围在 `[0, 99]`.

**思路:**

获取数组中最大的数值和第二大的数值，进行比较就行。

**答案:**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function(nums) {
    const maxNum = Math.max.apply(Math, nums)
    const arr = []
    let maxIndex = 0
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] == Math.max.apply(Math, nums)) {
        maxIndex= i
      } else {
        arr.push(nums[i])
      }
    }
    const secondMaxNum = Math.max.apply(Math, arr)
    if(maxNum >= secondMaxNum*2) {
        return maxIndex
    } else {
        return -1
    }
};
```

