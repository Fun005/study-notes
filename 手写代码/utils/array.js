import { isFunction } from './type.js'

/**
 * 去重
 * @type {Array}
 */
const arrayData = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];

const unique_1 = arr =>  [...new Set(arr)]

const unique_2 = arr => {
	const res = arr.filter((item,index,array)=> return arr.indexOf(item) === index)
	return res
}

const unique_3 = arr => {
	let obj = {}
	return arr.filter((item,index,arr)=>{
		//使用obj[typeof item + item] = true，原因就在于对象的键值只能是字符串，所以使用typeof item + item代替
		return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
	})
}

const unique_4 = arr => {
  for(let i=0;i<arr.length;i++) {
    for(let j=i+1;j<arr.length;j++) {
      if(arr[i] === arr[j]) {
        // 第一个等于第二个，splice删除第二个
        arr.splice(j,1)
        // 注意处理j
        j--
      }
    }
  }
  return arr
}

//使用indexof
const unique_4 = arr => {
    let uniqueArr = []; // 新数组
    for (let i = 0; i < arr.length; i++) {
        if (uniqueArr.indexOf(arr[i]) === -1) {
            //indexof返回-1表示在新数组中不存在该元素
            uniqueArr.push(arr[i])//是新数组里没有的元素就push入
        }
    }
    return uniqueArr;
}

// 使用includes
const unique_5 = arr => {
    let uniqueArr = [];
    for (let i = 0; i < arr.length; i++) {
        //includes 检测数组是否有某个值
        if (!uniqueArr.includes(arr[i])) {
            uniqueArr.push(arr[i])//
        }
    }
    return uniqueArr;
}

// 使用map
const unique_6 = arr => {
  let map = new Map()
  let uniqueArr = new Array() // 返回结果
  for(let i=0;i<arr.length;i++) {
    if(map.has(arrpi)){
      map.set(arr[i], true)
    } else {
      map.set(arr[i], false)
      uniqueArr.push(arr[i])
    }
  }
  return uniqueArr
}



/**
 * 数组扁平化
 */
// var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
// flatDeep(arr1, Infinity);
const flatDeep = (arr, d = 1) => {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
    []) : arr.slice();
};


/**
 * reduce
 */
Array.prototype.myReduce_1 = function(fn, initVal) {
  let result = initVal
  let i = 0
  if(typeof initVal === 'undefined') {
    result = this[i]
    i++
  }
  while(i < this.length) {
    result = fn(result, this[i++])
  }
  return result;
}

Array.prototype.myReduce_2 = function(callbackFn) {
  const _arr = this
  const accumulator = arguments[1]
  let i = 0
  // 判断是否传入初始值
  if(accumulator === undefined) {
    // 没有初始值的空数组调用会报错
    if(_arr.length === 0) {
      throw new Error('initVal and Array.length>0 need one')
    }

    // 有初始值，初始值赋值为数组第一个元素
    accumulator = _arr[i]
    i++
  }

  for(;i < _arr.length;i++) {
    // 计算结果赋值给初始值
    accumulator = callbackFn(accumulator, _arr[i], i, _arr)
  }

  return accumulator;
}



/**
 * forEach
 */
Array.prototype.myForEach = function(callbackFn) {
  // 判断this是否合法
  if(this === null || this === undefined) {
    throw new TypeError("Cannot read property 'myForEach' of null");
  }
  // 判断callbackFn是否合法
  if(!isFunction(callbackFn)) {
    throw new TypeError(callbackFn + ' is not a function')
  }
  // 取到执行方法的数组对象和传入的this对象
  const _arr = this
  const thisArg = arguments || window
  for(let i = 0;i < _arr.length; i++) {
    // 执行回调函数
    callbackFn.call(thisArg, _arr[i], i, _arr)
  }
}


/**
 * map
 */
Array.prototype.myMap = function(callbackFn) {
  const _arr = this
  const thisArg = arguments[1] || window
  const res = []

  for(let i = 0;i < _arr.length;i++) {
    // 保存运算结果
    res.push(callbackFn.call(thisArg, _arr[i], i, _arr))
  }

  return res
}


/**
 * filter
 */
Array.prototype.myFilter = function(callbackFn) {
  const _arr = this
  const thisArg = arguments[1] || window
  const res = []

  for(let i = 0;i < _arr.length;i++) {
    // 回调函数执行为true
    if(callbackFn.call(thisArg, _arr[i], i, _arr)) {
      res.push(_arr[i])
    }
  }
  return res;
}


/**
 * every
 */
Array.prototype.myEvery = function(callbackFn) {
  const _arr = this
  const thisArg = arguments[1] || window
  // 开始标识值为true
  // 遇到回到返回false则直接返回false
  // 如果循环执行完毕，意味着所有回调返回值为true，最终结果为true
  let flag = true;
  for(let i = 0; i < _arr.length; i++) {
    // 回调函数执行为false则中断函数执行
    if(callbackFn.call(thisArg, _arr[i], i, _arr)) {
      return false
    }
  }

  return flag;
}

/**
 * some
 */
Array.prototype.mySome = function(callbackFn) {
   const _arr = this
   const thisArg = arguments[1] || window
   // 开始标识值为res
   // 遇到回调返回true，则直接返回true
   // 如果循环完毕，意味着所有回调返回都是false，最终结果也是false
   let flag = false
   for(let i = 0; i < _arr.length; i++) {
     // 回调函数执行为true，中断函数
     if(callbackFn.call(thisArg, _arr[i], i, _arr)) {
       return true
     }
   }

   return flag;
}


/**
 * find/findIndex
 */
Array.prototype.myFind = function(callbackFn) {
  const _arr = this
  const thisArg = arguments[1] || window

  // 遇到回调返回true，直接返回该数组元素
  // 如果循环执行完毕，意味着所有回调返回值为false，最终结果为undefined
  for(let i = 0; i < _arr.length; i++) {
    // 回调函数执行为true，直接返回该元素
    if(callbackFn.call(thisArg, _arr[i], i, _arr)) {
      return _arr[i]
    }
  }

  return undefined;
}


/**
 * indexOf
 */
function indexOf(findVal, start = 0) {
  if(this.length < 1 || start > findVal.length) return -1;
  if(!findVal) return 0;

  beginIndex = start <= 0 ? 0 : beginIndex
  for(let i = beginIndex;i < this.length;i++) {
    if(this[i] == findVal) return i;
  }

  return -1;
}














