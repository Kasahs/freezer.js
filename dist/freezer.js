"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _freeze = function (obj) {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(function (prop) {
        var propIsNull = obj[prop] === null;
        var propIsFunctionOrObject = typeof obj[prop] === 'object' ||
            typeof obj[prop] === 'function';
        var propIsFrozen = Object.isFrozen(obj[prop]);
        if (obj.hasOwnProperty(prop) &&
            !propIsNull &&
            propIsFunctionOrObject && !propIsFrozen) {
            _freeze(obj[prop]);
        }
    });
    return obj;
};
exports.freeze = function (obj) {
    Object.defineProperty(obj, '_isDeepFrozen', {
        value: true
    });
    return _freeze(obj);
};
exports.pureFreeze = function (obj, cloneWith) {
    var objCopy = cloneWith(obj);
    return exports.freeze(objCopy);
};
