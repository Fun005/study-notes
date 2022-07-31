/**
 * javascript 排序算法
 */

// quick sort 快速排序

function quickSort (arr) {
	const length = arr.length
	if(length === 0) return arr

	const midIndex = Math.floor(length/2)
	const midValue = arr[midIndex]

	const left = []
	const right = []

	for(let i = 0;i<length;i++){
		if (i !== midIndex) {
			const v = arr[i]
			if (v < midValue) {
				left.push(v)
			}
			if (v > midValue) {
				right.push(v)
			}
		}
	}

	return quickSort(left).concat([midValue],quickSort(right))
}


function bubbleSort(arr){}