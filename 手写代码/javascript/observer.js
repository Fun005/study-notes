//观察者模式指的是一个对象（Subject）维持一系列依赖于它的对象（Observer），
//当有关状态发生变更时 Subject 对象则通知一系列 Observer 对象进行更新。
//在观察者模式中，Subject 对象拥有添加、删除和通知一系列 Observer 的方法等等，而 Observer 对象拥有更新方法等等。
//在 Subject 对象添加了一系列 Observer 对象之后，Subject 对象则维持着这一系列 Observer 对象，
//当有关状态发生变更时 Subject 对象则会通知这一系列 Observer 对象进行更新

// function Subject(){
// 	this.observers = []
// }

// Subject.prototype = {

// 	// 添加
// 	add(observer){
// 		this.observers.push(observer)
// 	},

// 	// 通知
// 	notify(){
// 		const observers = this.observers
// 		const len = observers.length
// 		for(let i=0;i<len;i++){
// 			console.log(observers[i])
// 			observers[i].update()
// 		}
// 	},


// 	// 删除
// 	remove(observer){
// 		const observers = this.observers
// 		const len = observers.length
// 		for(let i=0;i<len;i++){
// 			if(observers[i] === observer){
// 				observers.splice(i,1)
// 			}
// 		}
// 	}

// }

// 目标对象
class Subject {
	constructor(){
		// 观察者列表
		this.observers = []
	}

	// 添加一个观察者
	add(observer){
		this.observers.push(observer)
	}

	// 通知所有观察则
	notify(){
		this.observers.forEach(observer => {
			observer.update()
		})
	}
}

// Observer对象,观察者
// function Observer(name){
// 	this.name = name
// }

// Observer.prototype = {
// 	update(){
// 		// do sth update
// 		console.log('my name is '+this.name);
// 	}
// }

class Observer {
	/**
   * 构造器
   * @param {Function} cb 回调函数，收到目标对象通知时执行
   */
	constructor(cb) {
		if(typeof cb === 'function') {
			this.callback = cb
		} else {
			throw new Error('Observer构造器必须传入函数类型！')
		}
	}

	//被目标对象通知时执行
	update(){
		this.callback()
	}
}

const observerCb = () => {
	console.log('我被通知到了')
}


const observer = new Observer(observerCb)

const subject = new Subject()

subject.add(observer)

subject.notify()

// 这里创建了 Subject 对象和两个 Observer 对象，
// 当有关状态发生变更时则通过 Subject 对象的 notify 方法通知这两个 Observer 对象，
// 这两个 Observer 对象通过 update 方法进行更新。
// 在 Subject 对象添加了一系列 Observer 对象之后，还可以通过 remove 方法移除某个  Observer 对象对它的依赖。

// var sub = new Subject();

// var obs1 = new Observer('obs1');

// var obs2 = new Observer('obs2');

// sub.add(obs1);

// sub.add(obs2);

// sub.remove(obs2);

// sub.notify();  //my name is obs1、my name is obs2

