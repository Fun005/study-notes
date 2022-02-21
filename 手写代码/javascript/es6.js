
// 实现set
class Set {
	constructor() {
		this.items = {}
		this.size = {}
	}

	has(ele) {
		return ele in this.items
	}

	add(ele) {
		if(!this.has(ele)) {
			this.items[ele] = ele
			this.size++
		}
		return this
	}

	delete(ele) {
		if(this.has(ele)) {
			delete this.items[ele]
			this.size--
		}
		return this
	}

	clear() {
		this.items = {}
		this.size = 0
	}

	value() {
		let values = []
		for(let key in this.items) {
			if(this.items.hasOwnProperty(key)) {
				values.push(key)
			}
		}
		return values
	}
}


// 实现map
function defaultToString(key) {
	const toStringKey = Object.prototype.toString.call(key)
	if(key === null) return 'NULL';
	if(key === undefined) return 'UNDEFINED';
	if(toStringKey === '[object Object]' || toStringKey === '[object Array]') return JSON.stringify(key)
	return key.toString()
}

class Map {
	constructor() {
		this.items = {}
		this.size = 0
	}

	set(key, value) {
		if(!this.has(key)) {
			this.items[defaultToString(key)] = value
			this.size++
		}
		return this
	}

	get(key) {
		return this.items[defaultToString(key)]
	}

	has(key) {
		return this.items[defaultToString(key)] !== undefined
	}

	delete(key) {
		if(this.has(key)) {
			delete this.items[key]
			this.size--
		}
		return this
	}

	clear() {
		this.items = {}
		this.size = 0
	}

	keys() {
		let keys = []
		for(let key in this.items) {
			if(this.items[key]) keys.push(key)
		}
	  return keys
	}

	values() {
		let values = []
		for(let key in this.items) {
			if(this.items[key]) values.push(this.items[key])
		}
	  return values
	}
}





















