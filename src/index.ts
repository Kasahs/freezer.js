module freezer {
	const _freeze = <T>(obj:T):T => {
		Object.freeze(obj)
		Object.getOwnPropertyNames(obj).forEach((prop) => {
			let propIsNull = obj[prop] === null
			let propIsFunctionOrObject = typeof obj[prop] === 'object' || 
				typeof obj[prop] === 'function'
			let propIsFrozen = Object.isFrozen(obj[prop])
			
			if(obj.hasOwnProperty(prop) && !propIsNull && propIsFunctionOrObject) {
				_freeze(obj[prop])
			}
		})
		return obj
	}
	
	export const freeze = <T>(obj:T):T => {
		Object.defineProperty(obj, '_isDeepFrozen', {
			value: true
		})
		return _freeze(obj)
	}
	
	export const pureFreeze = <T>(obj:T, cloneWith:<T>(o:T) => T) => {
		let objCopy = cloneWith(obj)
		return freeze(objCopy)
	}

}

export {freezer}