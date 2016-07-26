'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Clean = require('../index');

describe('Clean', () => {

    const fct1 = function () {
    };
    fct1.a = 1;

    const cyclic = { a: { b: { c: {} } }, a1: 1 };
    cyclic.a.b.c = cyclic;

    const cyclicfct = function () {};
    cyclicfct.a = { b: { c: {} } };
    cyclicfct.a.b.c = cyclicfct;

    const tests = [
        {
            input: { a: 1 }, output: { a: 1 }
        },
        {
            input: { a: [1] }, output: { a: [1] }
        },
        {
            input: { a: 1, b: 2, c: function () {} }, output: { a: 1, b: 2, c: {} }
        },
        {
            input: { a: 1, b: 2, c: fct1 }, output: { a: 1, b: 2, c: { a: 1 } }
        },
        {
            input: cyclic, output: { a: { b: { c: {} } }, a1: 1 }
        },
        {
            input: cyclicfct, output: { a: { b: { c: {} } } }
        }
    ];

    tests.forEach((item, rank) => {

        it(`should transform item ${rank}`, { plan: 1 }, (done) => {

            expect(Clean(item.input)).to.equal(item.output);
            done();
        });
    });


});
