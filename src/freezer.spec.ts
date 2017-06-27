import {expect, assert} from 'chai'
import {cloneDeep} from 'lodash'
import * as freezer from './freezer'
const dummy = () => {
    let obj = {
        a: 1, 
        b: 2, 
        n1: {
            x: 1, 
            y: 2, 
            n2: {
                x: 5, y: 8, n3: null
            }
        },
        fun: function fun(){
            "hello there"
        },
        p: undefined,
        q: null
    }
    return obj
}

describe('Freeze function', () => {
    it('should ensure nested object is frozen. Properties can not updated or added', () => {
        let testObj = dummy()
        freezer.freeze(testObj)
        function updateFail1(){
            testObj.n1.x = 7
        }
        function addPropertyFail1(){
            testObj.n1['new-key'] = 'new-value'
        }
        function updateFail2(){
            testObj.n1.n2.x = 11
        }
        function addPropertyFail2(){
            testObj.n1.n2['new-key'] = 'new-value'
        }
        expect(updateFail1).to.throw(TypeError)
        expect(updateFail2).to.throw(TypeError)
        expect(addPropertyFail1).to.throw(TypeError)
        expect(addPropertyFail2).to.throw(TypeError)
    })

    it('should not allow new keys to be added to frozen object', () => {
        let testObj = dummy()
        freezer.freeze(testObj)
        function fail() {
            testObj['new-key'] = 'new-value'
        }
        
        expect(fail).to.throw(TypeError)
        expect(testObj['new-key']).to.be.equal(undefined)
    })

    it('should freeze functions as well', () => {
        let testObj = dummy()
        freezer.freeze(testObj)
        function fail(){
            testObj.fun.prototype = {apple: 'pie'}
        }
        expect(fail).to.throw(TypeError)
    })

    it('should have _isDeepFrozen', () => {
        let testObj = dummy()
        expect(testObj['_isDeepFrozen']).to.be.equal(undefined)
        freezer.freeze(testObj)
        expect(testObj['_isDeepFrozen']).to.be.equal(true)
    })


})

describe('pureFreeze function', () => {
    let desc = 
    it(
        'should not affect passed object ' +
        'and returned object should be frozen', 
        () => {
            let testObj = dummy()
            let newObj = freezer.pureFreeze(testObj, cloneDeep)
            function fail(){
                newObj['new-prop'] = 'new-value'
            }
            expect(fail).to.throw(Error)
            testObj['new-prop'] = 'new-val'
            expect(testObj['new-prop'] === 'new-val')
            expect(newObj['_isDeepFrozen']).to.be.equal(true)
            expect(testObj['_isDeepFrozen']).to.be.equal(undefined)
        }
    )
})