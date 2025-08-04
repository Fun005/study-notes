// 柯里化就是把接受「多个参数」的函数变换成接受一个「单一参数」的函数，并且返回接受「余下参数」返回结果的一种应用
// 思路：
// 1.判断传递的参数是否达到执行函数的fn个数
// 2.没有达到的话，继续返回新的函数，并且返回curry函数传递剩余参数

const curryFn = (fn, ...args) =>
	fn.length > args.length ?
		(...arguments) => curryFn(fn, ...args, ...arguments) :
		fn(...args)


// test
let addSum = (a, b, c) => a + b + c
let add = curryFn(addSum)

console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
console.log(add(1, 2, 3))