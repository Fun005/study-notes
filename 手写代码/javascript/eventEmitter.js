//发布订阅模式指的是希望接收通知的对象（Subscriber）基于一个主题通过自定义事件订阅主题，
//发布事件的对象（Publisher）通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象。

class EventEmitter {
	constructor(){
		// 事件调度中心
		this.listeners = {}
	}

	/**
	 * 注册事件监听者（订阅者）
	 * @param {String} type 事件类型
	 * @param {Function} callback 回调函数
	 */
	on(type, callback){
		if(!this.listeners[type]){
			this.listeners[type] = []
		}
		this.listeners[type].push(callback)
	}

	/**
	 * 事件发布者
	 * @param {String} type 事件类型
	 * @param {...any} args 参数列表，把emit传递的参数赋给回调函数
	 */
	emit(type,...args){
		if(this.listeners[type]){
			this.listeners[type].forEach(cb => {
				cb(...args)
			})
		}
	}

	/**
	 * 移除某个事件监听者
	 * @param {String} type 事件类型
	 * @param {Funtion} callback 回调函数
	 */
	remove(type,callback) {
		if(this.listeners[type]){
			const targetIndex = this.listeners[type].findIndex(item => item ===callback)
			if(targetIndex !== -1){
				this.listeners[type].splice(targetIndex,1)
			}
			if(this.listeners[type].length === 0){
				delete this.listeners[type]
			}
		}
	}

	/**
	 * 移除某个事件全部监听者
	 * @param {String} type 事件类型
	 */
	removeAll(type) {
		if(this.listeners[type]){
			delete this.listeners[type]
		}
	}
}

// 创建事件管理器实例
const eventEmitter = new EventEmitter()

// 注册一个party事件订阅者
eventEmitter.on('party', () => console.log('let`s go party party allnight'))

// 发布事件-不传参数
eventEmitter.emit('party')

// 发布事件-携带参数
eventEmitter.on('party2',(owner) => console.log(`lets go party by:${owner}`))
eventEmitter.emit('party2','mayday')

// 移除事件订阅
const testRemoveFn = () => console.log('remove test')

eventEmitter.on('testRemove',testRemoveFn)
eventEmitter.emit('testRemove')

eventEmitter.remove('testRemove',testRemoveFn)
eventEmitter.emit('testRemove')

// 移除某个类型的全部事件订阅

eventEmitter.removeAll('party')
console.log(eventEmitter)



