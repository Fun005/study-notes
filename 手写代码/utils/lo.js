// 防抖
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
// 场景1：浏览器窗口resize过于频繁
// 场景2：按钮重复点击
// 场景3：文本编辑器实时保存
// 防抖重在清零「clearTimeout(timer)」

// 暴力版： 定时器期间，有新操作时，清空旧定时器，重设新定时器
export const debounce_1 = (fn, delay) => {
	let timer = null;
	return function(){
		// 如果 timer 存在则表示当前还在周期内，需要清空旧的定时器创建新的定时器
		if(timer) clearTimeout(timer);
		// 创建定时器，用于在周期结束后执行函数逻辑
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			// clearTimeout(timer);
			// timer = null;
		}, delay)
	}
}


export const debounce_2 = (fn, wait, immediate) => {
	let timeout, result;
	const debounce = function() {
		const context = this
		const args = arguments

		if(timeout) clearTimeout(timeout)
		if(immediate) {
			// 如果已经执行，不再执行
			let callNow = !timeout
			timeout = setTimeout(() => timeout = null, wait)
			if(callNow) result = fn.apply(context, args)
		} else {
			timeout = setTimeout(() => result = fn.apply(context, args), wait)
		}
		return result
	}

	debounce.cancel = function() {
		clearTimeout(timeout)
		timeout = null
	}

	return debounce
}



// 节流
// 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
// 场景1：scroll滚动事件，每隔特定描述执行回调函数
// 场景2：input输入框，每个特定时间发送请求或是展开下拉列表，（防抖也可以）
// 节流重在加锁「lock = false」
export const thorttle_1 = (fn, delay) => {
	let timer = null;
	let lock = true;
	return function(){
		if(!lock) return

		lock = false
		clearTimeout(timer)
		timer = setTimeout(function(){
			fn.apply(this, arguments)
			lock = true
		}, delay)
	}
}


export const thorttle_2 = (fn, wait, options) => {
	let timeout, context, args, result;
	let previous = 0;
	if(!options) options = {};

	const later = function() {
		previous = options.leading === false ? 0 : new Date().getTime();
		timeout = null;
		fn.apply(context, args);
		if(!timeout) context = args = null
	}

	const throttle = function() {
		const now = new Date().getTime();
		if(!previous && options.leading === false) previous = now;
		const remain = wait - (now - previous)
		context = this
		args = arguments
		if(remain <= 0 || remain > wait) {
			if(timeout) {
				clearTimeout(timeout)
				timeout = null
			}

			previous = now;
			fn.apply(context, args)
			if(!timeout) context = args = null
		} else if(!timeout && options.ttrailing !== false) {
			timeout = setTimeout(later, remain)
		}
	}
	return throttle
}


/**
 * 深拷贝
 */
//测试用例
// let obj = {
//     a: 1,
//     b: {
//         c: 2,
//         d: 3
//     },
//     d: new RegExp(/^\s+|\s$/g)
// }

// let clone_obj = deepClone(obj)
// obj.d = /^\s|[0-9]+$/g
// console.log(clone_obj)
// console.log(obj)

const deepClone = (obj, map = new WeakMap) => {
	if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);

  if (obj == null || typeof obj != 'object') return obj;
  if (map.has(obj)) {
  	return map.get(obj)
  }
  let t = new obj.constructor()
  map.set(obj,t)
  for(let key in obj) {
  	if(obj.hasOwnProperty(key)) {
  		t[key] = deepClone(obj[key], map)
  	}
  }
  return t;
}


const getType = obj => Object.prototype.toString.call(obj);

const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null;

const canTraverse = {
	'[object Map]': true,
	'[object Set]': true,
	'[object Array]': true,
	'[object Object]': true,
	'[object Arguments]': true,
}

const mapTag = '[object Map]'
const setTag = '[object Set]'
const boolTag = '[object Boolean]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const handleRegExp = target => {
	const { source, flags } = target
	return new target.constructor(source, flags);
}

const handleFunc = fn => {
	// 箭头函数直接返回自身
 	if(!fn.prototype) return fn;
 	const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const fnString = fn.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(fnString)
  const body = bodyReg.exec(fnString)
  if(!body) return null;
  if(param) {
  	const paramArr = param[0].split(',');
  	reutrn new Function(...paramArr, body[0])
  } else {
  	return new Function(body[0])
  }
}

const handleNotTraverse = (target, tag) => {
	const Ctor = target.constructor;
	switch(tag) {
		case boolTag:
			return new Object(Boolean.prototype.valueOf.call(target));
		case numberTag:
			return new Object(Number.prototype.valueOf.call(target));
		case stringTag:
			return new Object(String.prototype.valueOf.call(target));
		case symbolTag:
			return new Object(Symbol.prototype.valueOf.call(target));
		case errorTag:
		case dateTag:
			return new Ctor(target)
		case regexpTag:
			return handleRegExp(target)
		case funcTag:
			return handleFunc(target)
		default:
			return new Ctor(target)
	}
}

const deepClone_2 = (target, map = new WeakMap()) => {
	if(!isObject(target)) return target

	let type = getType(target)
	let cloneTarget
	if(!canTraverse[type]) {
		// 处理不能遍历的对象
		return handleNotTraverse(target, type);
	} else {
		// 保证对象的原型不丢失
		let ctor = target.constructor;
		cloneTarget = new ctor();
	}

	if(map.get(target)) return target;
	map.set(target, true);

	if(type === mapTag) {
		// 处理Map
		target.forEach((item,key) => {
			cloneTarget.set(deepClone_2(key, map), deepClone_2(item, map))
		})
	}

	if(type === setTag) {
		// 处理Set
		target.forEach(item => cloneTarget.add(deepClone_2(item, map)))
	}

	// 处理数组和对象
	for(let prop in target) {
		if(target.hasOwnProperty(prop)) {
			cloneTarget[prop] = deepClone_2(target[prop], map)
		}
	}

	return cloneTarget;
}


/**
 * sleep
 */
const sleep = (fn, time) => {
	return new Promise((resolve)=>{
		setTimeout(()=>resolve(fn), time)
		// 或者：setTimeout(resolve, time)
	})
}
// let saySomething = (name) => console.log(`hello,${name}`)
// async function autoPlay() {
//     let demo = await sleep(saySomething('TianTian'),1000)
//     let demo2 = await sleep(saySomething('李磊'),1000)
//     let demo3 = await sleep(saySomething('掘金的好友们'),1000)
// }
// autoPlay()


/**
 * ajax
 */
function ajax (method,url) {
	let request = new XMLHttpRequest();
	request.open(method,url,true);
	request.onreadystatechange = function () {
		if(request.readyState === 4 && request.status === 200) {
			console.log(request.responseText)
		}
	}
	request.send();
}


/**
 * trim
 */
function trim(str) {
	return str.replace(/^\s+|\s+$/g, '')
}
// String.prototype.trim = function(){
//     return this.replace(/^\s+|\s+$/g, '')
// }


/**
 * Object.create
 */
function objCreate(proto) {
	function Fn() {};
	Fn.prototype = proto;
	Fn.prototype.constructor = Fn;
	return new Fn()
}
// let demo = {
//     c : '123'
// }
// let cc = Object.create(demo)

function newCreate(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw TypeError('Object prototype may only be an Object: ' + proto)
    }
    function F() { }
    F.prototype = proto
    const o = new F()

    if (propertiesObject !== undefined) {
        Object.keys(propertiesObject).forEach(prop => {
            let desc = propertiesObject[prop]
            if (typeof desc !== 'object' || desc === null) {
                throw TypeError('Object prorotype may only be an Object: ' + desc)
            } else {
                Object.defineProperty(o, prop, desc)
            }
        })
    }

    return o;
}


function createObject(Con) {
	// 创建新对象obj
	// var obj = {} 也可以
	let obj = Object.create(null);

	// 将obj.__proto__  => 构造函数原型
	// (不推荐) obj.__proto__ = Con.prototype
	Object.setPrototypeOf(obj, Con.prototype);

	// 执行构造函数，并接受构造函数返回值
	const ret = Con.apply(obj, [].slice.call(arguments, 1));

	// 若构造函数返回值为对象，直接返回该对象，否则返回obj
	return typeof(ret) === 'object' ? ret : obj;
}


/**
 * 实现一个同时允许任务数量最大为n的函数
 * 首先如何限制最大数量n
 * while 循环start < n，然后就是then的回调
 */
function limitRunTask(tasks, n) {
	return new Promise((resolve, reject) => {
		let index = 0, finish = 0, start = 0, result = [];
		const taskLen = tasks.length;

		function run() {
			if(finish === taskLen) {
				resolve(result);
				return;
			}

			while(start < n && index < taskLen) {
				// 每阶段的任务数量++
				start++;
				let current = index;
				tasks[index++]().then(v => {
					start--;
					finish++;
					result[current] = v;
					run();
				})
			}
		}

		run();
	})
}

function multipleRequest(urls = [], maxNum) {
	// 请求总数量
	const len = urls.length;
	// 根据请求数量创建一个数组，保存请求的结果
	const result = new Array(len).fill(false);
	// 当前完成数量
	let count = 0;

	return new Promise((resolve, reject) => {
		// 最多请求maxNum
		while(count < maxNum) {
			run();
		}

		function run() {
			let current = count++;

			//处理边界条件
			if(current >= len) {
				// 请求全部完成就将promise置为成功的状态，然后将result作为promise值返回
				!result.includes(false) && resolve(result)
				return;
			}

			const url = urls[current];
			console.time(`start ${current}`);
			fetch(url).then(res => {
				// 保存请求结果
				result[current] = res;
				console.log(`end ${current}, ${new Date().toLocaleString()}`);
				// 请求没有完成，递归执行
				if(current < len) {
					run();
				}
			}).catch(err => {
				console.time(`end ${current}, ${new Date().toLocaleString()}`);
				result[current] = err;
				// 请求没有完成，递归执行
				if(current < len) {
					run();
				}
			})
		}
	})
}
































