function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr){
	let _arr = arr.slice()
	for(let i=0; i<_arr.length; i++){
		let j = getRandomNum(0, i)
		let t = _arr[j]
		_arr[j] = _arr[i]
		_arr[i] = t
	}
	return _arr
}
