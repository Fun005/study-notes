
// 类型判断
// getType函数，属于【偏函数】范畴，偏函数实际上是返回了一个包含【预处理函数】的新函数
const getType = type => obj => Object.prototype.toString.call(obj) === `[object ${type}]`

export const isNum = getType('Number')

export const isString = getType('String')

export const isBoolean = getType('Boolean')

export const isNull = getType('Null')

export const isUndefined = getType('Undefined')

export const isArray = getType('Array')

export const isObject = getType('Object')

export const isFunction = getType('Function')

export const isRegExp = getType('RegExp')

export const isDate = getType('Date')

// 全部类型如下：
const typeObj = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Function]': 'function',
    '[object Date]': 'date', // Object.prototype.toString.call(new Date())
    '[object RegExp]': 'regExp',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
    '[object WeakMap]': 'weakMap',
    '[object Window]': 'window',  // Object.prototype.toString.call(window)
    '[object Error]': 'error', // new Error('1')
    '[object Arguments]': 'arguments',
}

