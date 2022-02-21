// 综合

/**
 * 十进制转换
 * 给定10进制数，转换成[2~16]进制区间数
 */
function covertNumber(number, base = 2) {
	let rem, res = '', digits = '0123456789ABCDEF', stack = [];

  while (number) {
    rem = number % base;
    stack.push(rem);

    number = Math.floor(number / base);
  }

  while (stack.length) {
    res += digits[stack.pop()].toString();
  }

  return res;
}


/**
 * 数字转字符串千分位
 */
function thousandth(str) {
  return str.replace(/\d(?=(?:\d{3})+(?:\.\d+|$))/g, '$&,');
}

function thousandth_2(str) {
  const reg = /(?=(\B\d{3})+$)/g;
  return str.replace(reg, ',');
}


// 写个转换函数，把一个JSON对象的key从下划线形式（Pascal）转换到小驼峰形式（Camel）
// 1. 利用正则表达式
function pascalToCamel_1(str) {
    return str.replace(/_([a-z])/g, function(all, i) {
        return i.toLowerCase();
    })
}

// 2. 利用数组
function pascalToCamel_2(str) {
  let arr = str.split('_')
  return arr.map((item, index) => {
    if(index === 0) return item
    return item.charAt(0).toUpperCase()+item.slice(1)
  }).join('')
}

// 小驼峰(Camel)转下划线(Pascal)
// 1. 正则
function camelToPascal_1(str) {
  let temp = str.replace(/[A-Z]/g, function(i) {
      return '_' + i.toLowerCase();
  })
  if (temp.slice(0,1) === '_') {
      temp = temp.slice(1);   //如果首字母是大写，执行replace时会多一个_，需要去掉
  }
  return temp;
}
// 2. 数组
function camelToPascal_1(str) {
  let arr = str.split('');
  let result = arr.map((item) => {
      if (item.toUpperCase() === item) {
          return '_' + item.toLowerCase();
      } else {
          return item;
      }
  }).join('');
  return result;
}



/**
 * jsonp，核心原理：script 标签不受同源策略约束，所以可以用来进行跨域请求，优点是兼容性好，但是只能用于 GET 请求
 */
const josnp = ({url, params, callbackName}) => {
  const generateUrl = () => {
    let dataSrc = ''
    for(let key in params) {
      if(params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}&`
      }
    }
    dataSrc += `callback=${callbackName}`

    return `${url}?${dataSrc}`
  }

  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement('script')
    scriptEle.src = generateUrl()
    document.body.appendChild(scriptEle)
    window[callbackName] = data => {
      resolve(data)
      document.removeChild(scriptEle)
    }
  })
}


/**
 * ajax
 */
const myAjax = function(url) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject('Mscrosoft.XMLHttp')
    xhr.open('GET', url, false)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.onreadystatechange = function() {
      if(xhr.readyStatus !== 4) return;
      if(xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText))
      }
    }
    xhr.send()
  })
}

























