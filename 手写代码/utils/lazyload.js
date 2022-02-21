import { debounce_2 } from './lo.js'

const imgList = [...document.querySelectorAll('img')]
const length = imgList.length

// 自执行
const imgLazyLoad = (() => {
	let count = 0

	return function() {
		let deleteIndexList = []
		imgList.forEach((img, index) => {
			let rect = img.getBoundingClientRect()
			if(rect.top < window.innerHeight) {
				img.src = img.dataset.src
				deleteIndexList.push(index)
				count++
				if(count === length) {
					document.removeEventListener('scroll', imgLazyLoad)
				}
			}
		})

		imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
	}
})()

document.addEventListener('scroll', debounce_2(imgLazyLoad, 300))