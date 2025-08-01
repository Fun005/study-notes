/**
 * 并发控制队列
 */

export class TaskQuene {
    private queue: Array<() => Promise<any>> = [] //  存储待执行的任务队列
    private activeCount: number = 0 // 当前正在执行的任务数量
    private maxTaskCount: number // 最大并发数

    constructor(maxTaskCount: number) {
        this.maxTaskCount = maxTaskCount
    }

    /**
     * 获取当前队列中待执行的任务数量
     */
    public get pending() {
        return this.queue.length
    }

    /**
     * 获取当前正在执行的任务数量
     */
    public get active() {
        return this.activeCount
    }

    public clear(): void {
        this.queue = []
    }

    public add<T>(fn: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            const task = async () => {
                try {
                    resolve(await fn())
                    // const res = await fn()
                    // resolve(res)
                } catch (error) {
                    reject(error)
                }
            }

            this.queue.push(task)
            this.next()
        })
    }

    private next() {
        if (this.queue.length === 0 || this.activeCount >= this.maxTaskCount) {
            return
        }

        const task = this.queue.shift()
        if (task) {
            this.activeCount++
            task().finally(() => {
                this.activeCount--
                this.next() // 执行下一个任务`
            })
        }
    }
}

// 创建队列实例，最大并发数为 3
const queue = new TaskQuene(3)

// 模拟异步任务
const createTask = (id: number) => {
    return new Promise((resolve) => {
        const delay = Math.random() * 2000
        setTimeout(() => {
            console.log(`任务 ${id} 完成`)
            resolve(`任务 ${id} 的结果`)
        }, delay)
    })
}

// 添加任务
async function runTasks() {
    console.log(`开始执行任务`)

    for (let i = 1; i <= 5; i++) {
        queue.add(() => createTask(i)).then((result) => console.log(result))

        console.log(
            `任务 ${i} 添加, pending: ${queue.pending}, active: ${queue.active}`
        )
    }
}

runTasks()

// 合并两个有序数组
// nums1 = [1,2,3,0,0,0,0],num2 = [2,5,6,7],m = 3, n = 4
// nums1 = [4,5,7,0,0,0,0],num2 = [2,3,7,8],m = 3, n = 4
function merge2Arr(nums1,nums2,m,n) {

    let i = m - 1
    let j = n - 1
    let k = m + n - 1

    while(i >= 0 && j >= 0) {
        if(nums1[i] > nums2[j]) {
            nums1[k] = nums1[i]
            i--
        } else {
            nums1[k] = nums2[j]
            j--
        }
        k--
    }


    while(j >= 0) {
        nums1[j] = nums2[j]
        j--
    }

    return nums1

}

















































