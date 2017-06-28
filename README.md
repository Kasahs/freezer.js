[![Build](https://travis-ci.org/Kasahs/freezer.js.svg?branch=master)](https://travis-ci.org/Kasahs/freezer.js)
[![codecov.io](https://codecov.io/github/Kasahs/freezer.js/coverage.svg?branch=master)](https://codecov.io/github/Kasahs/freezer.js?branch=master)
## Freezer.js   
### `object.freeze()` for all nested properties
Object.freeze doesn't freeze nested objects.  
freeze.js is a lib written in typescript 2.0 which provides functions for deeply Freezing JS objects.

### Usage
```ts
import * as freezer from 'freezer'
import {cloneDeep} from lodash

function dummy(){
	let obj = {a:1, nested: {p:1, q:2}}
	return obj	
}

Object.freeze(dummy())
obj.nested['new-key'] = 'new-value' // this works which is why we need Freezer.js
freezer.freeze(dummy())
obj.nested['new-key'] = 'new-value' // now this will throw type error

/*
There is also a pureFreeze method. 
It freezes after cloning and accepts cloning method as arg
*/
let originalObj = dummy()
let newObj = freezer.pureFreeze(originalObj, cloneDeep)

originalObj['new-key'] = 'new-value' // still works
originalObj.a = '5' // still works

newObj['new-key'] = 'new-value' // throws error
newObj.a = '5' // throws error
```