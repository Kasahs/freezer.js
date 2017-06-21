
const freeze = (obj:Object) => {
	Object.freeze(obj)
	Object.getOwnPropertyNames(obj).forEach((prop) => {
		let propIsNull = obj[prop] === null
		let propIsFunctionOrObject = typeof obj[prop] === 'object' || 
			typeof obj[prop] === 'function'
		let propIsFrozen = Object.isFrozen(obj[prop])
		
		if(obj.hasOwnProperty(prop) && !propIsNull && propIsFunctionOrObject) {
			freeze(obj[prop])
		}
	})
	return obj
}


