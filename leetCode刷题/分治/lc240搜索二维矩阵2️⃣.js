// 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

// 每行的元素从左到右升序排列。
// 每列的元素从上到下升序排列。

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

function searchMatrix(matrix, target) {
	if(matrix.length === 0 || matrix[0].length === 0) return false

	// 从左下开始
	let len = matrix.length - 1
	let i = 0
	while(i >= 0 && i < matrix[0].length) {
		if(matrix[len][i] > target) {
			len--
		} else if(matrix[len][i] < target) {
			i++
		} else {
			return true
		}
	}

	return false
}
