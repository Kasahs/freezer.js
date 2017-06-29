[![Build](https://travis-ci.org/Kasahs/freezer.js.svg?branch=master)](https://travis-ci.org/Kasahs/freezer.js)
[![codecov.io](https://codecov.io/github/Kasahs/freezer.js/coverage.svg?branch=master)](https://codecov.io/github/Kasahs/freezer.js?branch=master)
[![npm version](https://badge.fury.io/js/freezerjs.svg)](https://badge.fury.io/js/freezerjs)
## Freezer.js   
### `object.freeze()` for all nested properties
Object.freeze doesn't freeze nested objects.  
freeze.js is a lib written in typescript 2.0 which provides functions for deeply Freezing JS objects.

### Usage
```ts
/* 
Assuming strict mode.
If strict mode is not active the lines that throw errors will fail silently in some envs
*/
import * as freezer from 'freezerjs'
import {cloneDeep} from 'lodash'

function dummy(){
	let obj = {a:1, nested: {p:1, q:2}}
	return obj	
}
// with normal Object.freeze 
let obj = Object.freeze(dummy())
obj.nested['new-key'] = 'new-value' // this works
obj.nested.a = 5 // this works

//but we want a deep freeze so use freezerjs:
freezer.freeze(obj)
obj.nested['new-key'] = 'new-value' // throws error
obj.nested.a = 8 // throws error

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