
/**
 * promise.all
 */

function PromiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			throw new TypeError("promises must be an array")
		}

		const result = []
		const total = promises.length
		let completedCount = 0
		if (total === 0) return resolve(result)

		promises.forEach((promise, index) => {
			// 确保每个元素都是Promise（非Promise则包装）
			// Promise.resolve(promise()).then(res => { }, err => { })
			promise.then(res => {
				result[index] = res // 按索引存储，保证顺序
				completedCount++
				completedCount === total && resolve(result)
			}, reason => {
				reject(reason) // 只要有一个失败就 reject
			})
		})
	})
}


/**
 * promose.finally
 */

Promise.prototype.finally = function (cb) {
	return this.then(function (value) {
		return Promise.resolve(cb()).then(function () {
			return value
		})
	}, function (err) {
		return Promise.resolve(cb()).then(function () {
			throw new Error(err)
		})
	})
}

// Promise.prototype.finally = function (callback) {
// 	return this.then(
// 		value => Promise.resolve(callback()).then(() => value),
// 		reason => Promise.resolve(callback()).then(() => { throw reason; })
// 	);
// };


/**
 * promise.allSettled
 */

function allSettled(promises) {
	if (promises.length === 0) return new Promise.resolve([])

	const _promises = promise.map(item => item instanceof Promise ? item : Promise.resolve(item))

	return new Promise((resolve, reject) => {
		const result = []
		let unSettledPromiseCount = _promises.length

		_promises.forEach((promise, index) => {
			promise.then((value) => {
				result[index] = {
					status: 'fulfilled',
					value
				}

				unSettledPromiseCount -= 1
				// resolve after all are settled
				if (unSettledPromiseCount === 0) {
					resolve(result)
				}

			}, (reason) => {
				result[index] = {
					status: 'rejected',
					reason
				}

				unSettledPromiseCount -= 1
				if (unSettledPromiseCount === 0) {
					resolve(result)
				}
			})
		})
	})

}


/**
 * Promise.race
 */
Promise.race = function (promiseArr) {
	return new Promise((resolve, reject) => {
		promiseArr.forEach(p => {
			Promise.resolve(p).then(val => {
				resolve(val)
			}, err => {
				reject(err)
			})
		})
	})
}


/**
 * Promise.any
 */

Promise.any = function (promiseArr) {
	let index = 0
	return new Promise((resolve, reject) => {
		const plen = promiseArr.length
		if (plen === 0) return

		promiseArr.forEach((p, i) => {
			Promise.resolve(p).then(val => resolve(val), err => {
				index++
				if (index === plen) {
					reject(new AggregateError('all promise were rejected'))
				}
			})
		})
	})
}


/**
 * resolve
 */
Promise.resolve = function (value) {
	if (value instanceof Promise) {
		return value
	}
	return new Promise(resolve => resolve(value))
}


/**
 * reject
 */

Promise.reject = function (reason) {
	return new Promise((resolve, reject) => reject(reason))
}


/**
 * promise.all
 */
Promise.myAll = function (arr) {
	return new Promise((resolve, reject) => {
		const len = arr.length
		if (len === 0) {
			return resolve([])
		} else {
			let res = []
			let count = 0
			for (let i = 0; i < len; i++) {
				// 同时也能处理arr数组中非promise对象
				if (!(arr[i] instanceof Promise)) {
					res[i] = arr[i]
					if (++count === len) resolve(res)
				} else {
					arr[i].then(data => {
						res[i] = data
						if (++count === len) resolve(res)
					}, err => resject(err))
				}
			}
		}
	})
}

/**
 * promise.race
 */
Promise.myRace = function (arr) {
	return new Promise((resolve, reject) => {
		const len = arr.length
		for (let i = 0; i < len; i++) {
			if (!(arr[i] instanceof Promise)) {
				Promise.resolve(arr[i]).then(resolve, reject)
			} else {
				arr[i].then(resolve, reject)
			}
		}
	})
}

// // 测试用例
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(11)
//     }, 2000);
// });
// let p2 = new Promise((resolve, reject) => {
//     reject('asfs')

// });
// let p3 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(33);
//     }, 4);
// });

// Promise.myall([p3, p1, 3, 4]).then(data => {
//     // 按传入数组的顺序打印
//     console.log(data); // [3, 1, 2]
// }, err => {
//     console.log(err)
// });

// Promise.myrace([p1, p2, p3]).then(data => {
//     // 谁快就是谁
//     console.log(data); // 2
// }, err => {
//     console.log('失败跑的最快')
// })


// 任务队列
// reduce会先遍历整个tasks任务列表
// 初始一个Promise.resolve()，
// await promise 等待前面promise结束继续下一个promise的生成，
// 每个promise里面生成的上下文都会对应一个task
let task = () => {
	return new Promise((resolve) => { })
}
function runTask(tasks) {
	return tasks.reduce(async function (promise, task) {
		await promise
		return new Promise(function (resolve) {
			task().then(() => {
				setTimeout(resolve, Config.requestTime) // 控制到请求之间的间隔时间
			})
		})
	}, Promise.resolve())
}

// 另一个变相写法
function myQueque(things) {
	var promise = Promise.resolve();
	things.forEach((thing) => {
		promise = promise.then(() => {
			return new Promise((resolve) => {
				dosomething(thing, () => {
					resolve();
				})
			})
		})
	})
	return promise;
}
