'use strict';
const clean = function (obj, seen, target) {

    if ((typeof obj !== 'object' && typeof obj !== 'function') || !obj) {
        return obj;
    }

    if (seen.has(obj)) {
        return {};
    }

    let result = target || {};

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
            result[key] = cleaned;
            if (cleaned === null || cleaned === undefined) {
                result[key] = {};
            }
        }
    }

    return result;
};

const starter = function (obj) {

    return clean(obj, new Set(), {});
};

module.exports = starter;
