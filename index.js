'use strict';
const Clone = require('lodash.clone');

const clean = function (obj, seen) {

    if ((typeof obj !== 'object' && typeof obj !== 'function') || !obj) {
        return obj;
    }

    seen = seen || new Set();

    if (seen.has(obj)) {
        return false;
    }

    let result = {};

    if (Array.isArray(obj)) {
        result = [];
    }

    seen.add(obj);

    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor.get || descriptor.set) {
            Object.defineProperty(result, key, descriptor);
        }
        else {
            const cleaned = clean(obj[key], seen);
            result[key] = cleaned || {};
        }
    }

    return result;
};

const starter = function (obj) {

    return clean(Clone(obj));
};

module.exports = starter;
