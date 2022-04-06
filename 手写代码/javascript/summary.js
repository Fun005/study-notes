// 常见的js方法实现

// this 永远指向最后调用它的那个对象

// apply
Function.prototype.myApply = function (context,[argsArray]) {
	// 简单判断
	// 默认不传就是window，也可以用es6设置默认参数
	// context = context || window
	// args = args || []

	// 严谨判断
	// 正确判断函数上下文对象
  if (context === null || context === undefined) {
     // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
      context = window
  } else {
      context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }


	// 给context新增一个独一无二的属性，以免覆盖原有属性
	const key = Symbol()
	context[key] = this

	// 通过隐式绑定的方式调用函数
	const result = context[key](...args)

	delete context[key]

	return result
}

// call
Function.prototype.myCall = function (context, ...args) {
	// 简单判断
	// 默认不传就是window，也可以用es6设置默认参数
	// context = context || window
	// args = args || []

	// 严谨判断
	// 正确判断函数上下文对象
  if (context === null || context === undefined) {
     // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
      context = window
  } else {
      context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }


	// 给context新增一个独一无二的属性，以免覆盖原有属性
	const key = Symbol()
	context[key] = this

	// 通过隐式绑定的方式调用函数
	const result = context[key](...args)

	delete context[key]

}

// test case：
// function demo(x1, x2) {
//     console.log(typeof this, this.a, this)
//     console.log(x1, x2)
// }
// demo.apply(cc, [2, 3])
// demo.myapply(cc, [2, 3])
// demo.call(cc,33,44)
// demo.mycall(cc,33,44)


// bind
// bind它并不是立马执行函数，而是有一个延迟执行的操作，就是生成了一个新的函数，需要你去执行它
Function.prototype.myBind = function(context,...args) {
	return (...newArgs) => {
		return this.call(context,...args,...newArgs)
	}
}
// // 测试用例
// let cc = {
//     name : 'TianTian'
// }
// function say(something,other){
//     console.log(`I want to tell ${this.name} ${something}`);
//     console.log('This is some'+other)
// }
// let tmp = say.mybind(cc,'happy','you are kute')
// let tmp1 = say.bind(cc,'happy','you are kute')
// tmp()
// tmp1()


/**
 * new
 * @return {[type]} [description]
 */
function _new() {
	let obj = {}
	let [constructor, ...args] = [...arguments]
	obj.__proto__ = constructor.prototype
	let result = constructor.apply(obj, args)
	if(result && typeof result === 'function' || typeof result === 'object') {
		return result;
	}
	return obj;
}


/**
 * instanceof
 * @param  {[type]} left  [description]
 * @param  {[type]} right [description]
 * @return {[type]}       [description]
 */
function my_instance_of(left, right) {
	if(typeof left !== 'object' || left === null) return false;
	let rightProto = right.prototype
	let leftProto = left.__proto__
	while(true){
		if(leftProto === null) return false;
		if(leftProto === rightProto) return true;
		leftProto = leftProto.__proto__
	}
}





