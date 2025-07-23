/**
 * 手写 Promise 核心代码
 */

class CorePromise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'

    constructor(fn) {
        this.status = CorePromise.PENDING
        this.result = null
        this.resolveCallbacks = []
        this.rejectCallbacks = []

        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {
        setTimeout(() => {
            if (this.status === CorePromise.PENDING) {
                this.status = CorePromise.FULFILLED
                this.result = result
                this.resolveCallbacks.forEach((cb) => cb(result))
            }
        })
    }

    reject(result) {
        setTimeout(() => {
            if (this.status === CorePromise.PENDING) {
                this.status = CorePromise.REJECTED
                this.result = result
                this.rejectCallbacks.forEach((cb) => cb(result))
            }
        })
    }

    then(onFullfilled, onRejected) {
        return new CorePromise((resolve, reject) => {
            onFullfilled =
                typeof onFullfilled === 'function' ? onFullfilled : () => { }
            onRejected = typeof onRejected === 'function' ? onRejected : () => { }

            if (this.status === CorePromise.PENDING) {
                this.resolveCallbacks.push(onFullfilled)
                this.rejectCallbacks.push(onRejected)
            }
            if (this.status === CorePromise.FULFILLED) {
                setTimeout(() => {
                    onFullfilled(this.result)
                    // resolve(onFullfilled(this.result))
                })
            } else if (this.status === CorePromise.REJECTED) {
                setTimeout(() => {
                    onRejected(this.result)
                    // reject(onRejected(this.result))
                })
            }
        })
    }
}

console.log('第一步')
let myPromise = new CorePromise((resolve, reject) => {
    console.log('第二步')
    setTimeout(() => {
        resolve('大成功   🎉')
        reject('大不成功   🎉')
        console.log('第四步')
    })
})

myPromise
    .then(
        (res) => console.log(res),
        (err) => console.log(err.message)
    )
    .then(
        (res) => console.log(res),
        (err) => console.log(err.message)
    )

console.log('第三步')

// console.log("第一步");
// let upromise = new Promise((resolve, reject) => {
//     console.log("第二步");
//     setTimeout(() => {
//         resolve("大成功   🎉")
//         reject("大不成功   🎉")
//         console.log("第四步");
//     });
// })
// upromise.then(res => console.log(res), err => console.log(err.message))
// console.log("第三步");
