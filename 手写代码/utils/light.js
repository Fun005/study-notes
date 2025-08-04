/**
 * 红绿灯
 * 模拟一个红绿灯变化，红灯 x 秒，绿灯 y 秒，黄灯 z 秒，然后循环
 */

function red() {
    console.log('红灯')
}
function green() {
    console.log('绿灯')
}
function yellow() {
    console.log('黄灯')
}

function light(cb, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            cb()
            resolve()
        }, time);
    })
}

function start() {
    return Promise.resolve().then(() => {
        return light(red, 1000)
    }).then(() => {
        return light(green, 3000)
    }).then(() => {
        return light(yellow, 1000)
    }).then(() => {
        return start()
    })
}

start()