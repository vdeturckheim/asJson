'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Clean = require('../index');

describe('Clean', () => {

    const fct1 = function () {};
    fct1.a = 1;

    const cyclic = { a: { b: { c: {} } }, a1: 1 };
    cyclic.a.b.c = cyclic;

    const cyclicfct = function () {};
    cyclicfct.a = { b: { c: {} } };
    cyclicfct.a.b.c = cyclicfct;

    const ro = { a: 1 };
    Object.defineProperty(ro, 'b', {
        enumerable: true,
        get: function () {

            return 2;
        }
    });
    let val = 5;
    Object.defineProperty(ro, 'c', {
        enumerable: true,
        get: function () {

            return val;
        },
        set: function () {

            val++;
        }
    });

    const tests = [
        {
            input: { a: 1 }, output: { a: 1 }
        },
        {
            input: { a: [1] }, output: { a: [1] }
        },
        {
            input: { a: 1, b: 0, c: function () {} }, output: { a: 1, b: 0, c: {} }
        },
        {
            input: { a: 1, b: 2, c: fct1 }, output: { a: 1, b: 2, c: { a: 1 } }
        },
        {
            input: cyclic, output: { a: { b: { c: { } } }, a1: 1 }
        },
        {
            input: cyclicfct, output: { a: { b: { c: { } } } }
        },
        {
            input: ro, output: ro
        },
        {
            input: { userName: { $gt: '' } }, output: { userName: { $gt: '' } }
        },
        {
            input: { a: null, b: undefined }, output: { a: {}, b: {} }
        }
    ];

    tests.forEach((item, rank) => {

        it(`should transform item ${rank}`, { plan: 1 }, (done) => {

            expect(Clean(item.input)).to.equal(item.output);
            done();
        });
    });


});
