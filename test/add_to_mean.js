/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var ss = require('../');

test('addToMean', function(t) {
    t.test('can get add a single value to a mean', function(t) {
        var values = [13, 14, 15, 8, 20];
        t.equal(ss.addToMean(ss.mean(values), values.length, 53), 20.5);
        t.equal(ss.addToMean(ss.mean(values), values.length, 53), ss.mean(values.concat(53)));
        t.equal(ss.mean([1, 2]), 1.5);
        t.end();
    });
    t.end();
});