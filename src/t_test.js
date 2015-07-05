'use strict';

var standard_deviation = require('./standard_deviation');
var mean = require('./mean');

/**
 * # [t-test](http://en.wikipedia.org/wiki/Student's_t-test)
 *
 * This is to compute a one-sample t-test, comparing the mean
 * of a sample to a known value, x.
 *
 * in this case, we're trying to determine whether the
 * population mean is equal to the value that we know, which is `x`
 * here. usually the results here are used to look up a
 * [p-value](http://en.wikipedia.org/wiki/P-value), which, for
 * a certain level of significance, will let you determine that the
 * null hypothesis can or cannot be rejected.
 */
function t_test(sample, x) {
    // The mean of the sample
    var sample_mean = mean(sample);

    // The standard deviation of the sample
    var sd = standard_deviation(sample);

    // Square root the length of the sample
    var rootN = Math.sqrt(sample.length);

    // Compute the known value against the sample,
    // returning the t value
    return (sample_mean - x) / (sd / rootN);
}

module.exports = t_test;
