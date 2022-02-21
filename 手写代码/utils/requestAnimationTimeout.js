// getRequestAnimationFrame
// 判断是否支持 requestAnimationFrame/cancelAnimationFrame ｜setTimeout/clearTimeout，根据支持语法返回对应的方法

const availablePrefixs = ['moz', 'ms', 'webkit']

function requestAnimationFramePolyfill () {
  let lastTime = 0
  return function (callback) {
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16 - (currTime - lastTime))
    const id = window.setTimeout(function () {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}

function getRequestAnimationFrame () {
  if (typeof window === 'undefined') {
    return () => {}
  }
  if (window.requestAnimationFrame) {
    // https://github.com/vuejs/vue/issues/4465
    return window.requestAnimationFrame.bind(window)
  }

  const prefix = availablePrefixs.filter(key => `${key}RequestAnimationFrame` in window)[0]

  return prefix ? window[`${prefix}RequestAnimationFrame`] : requestAnimationFramePolyfill()
}

function cancelRequestAnimationFrame (id) {
  if (typeof window === 'undefined') {
    return null
  }
  if (window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(id)
  }
  const prefix = availablePrefixs.filter(
    key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window
  )[0]

  return prefix
    ? (
      window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`]
    ).call(this, id)
    : clearTimeout(id)
}


// requestAnimationTimeout.js
// 创建自定 方法 requestAnimationTimeout 用于延迟执行
// 创建自定 方法 cancelAnimationTimeout 用于清除还未执行的requestAnimationTimeout

const dataSetTimeout = getRequestAnimationFrame()

export const cancelAnimationTimeout = frame => cancelRequestAnimationFrame(frame.id)

export const requestAnimationTimeout = (callback, delay = 0) => {
  const start = Date.now()
  function timeout () {
    if (Date.now() - start >= delay) {
      callback.call()
    } else {
      obj.id = dataSetTimeout(timeout)
    }
  }

  const obj = {
    id: dataSetTimeout(timeout)
  }

  return obj;
}
