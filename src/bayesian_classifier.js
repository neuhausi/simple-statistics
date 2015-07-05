'use strict';

/**
 * # [Bayesian Classifier](http://en.wikipedia.org/wiki/Naive_Bayes_classifier)
 *
 * This is a naïve bayesian classifier that takes
 * singly-nested objects.
 */
function bayesian() {
    // The `bayes_model` object is what will be exposed
    // by this closure, with all of its extended methods, and will
    // have access to all scope variables, like `total_count`.
    var bayes_model = {},
        // The number of items that are currently
        // classified in the model
        total_count = 0,
        // Every item classified in the model
        data = {};

    // ## Train
    // Train the classifier with a new item, which has a single
    // dimension of Javascript literal keys and values.
    bayes_model.train = function(item, category) {
        // If the data object doesn't have any values
        // for this category, create a new object for it.
        if (!data[category]) data[category] = {};

        // Iterate through each key in the item.
        for (var k in item) {
            var v = item[k];
            // Initialize the nested object `data[category][k][item[k]]`
            // with an object of keys that equal 0.
            if (data[category][k] === undefined) data[category][k] = {};
            if (data[category][k][v] === undefined) data[category][k][v] = 0;

            // And increment the key for this key/value combination.
            data[category][k][item[k]]++;
        }
        // Increment the number of items classified
        total_count++;
    };

    // ## Score
    // Generate a score of how well this item matches all
    // possible categories based on its attributes
    bayes_model.score = function(item) {
        // Initialize an empty array of odds per category.
        var odds = {}, category;
        // Iterate through each key in the item,
        // then iterate through each category that has been used
        // in previous calls to `.train()`
        for (var k in item) {
            var v = item[k];
            for (category in data) {
                // Create an empty object for storing key - value combinations
                // for this category.
                if (odds[category] === undefined) odds[category] = {};

                // If this item doesn't even have a property, it counts for nothing,
                // but if it does have the property that we're looking for from
                // the item to categorize, it counts based on how popular it is
                // versus the whole population.
                if (data[category][k]) {
                    odds[category][k + '_' + v] = (data[category][k][v] || 0) / total_count;
                } else {
                    odds[category][k + '_' + v] = 0;
                }
            }
        }

        // Set up a new object that will contain sums of these odds by category
        var odds_sums = {};

        for (category in odds) {
            // Tally all of the odds for each category-combination pair -
            // the non-existence of a category does not add anything to the
            // score.
            for (var combination in odds[category]) {
                if (odds_sums[category] === undefined) odds_sums[category] = 0;
                odds_sums[category] += odds[category][combination];
            }
        }

        return odds_sums;
    };

    // Return the completed model.
    return bayes_model;
}

module.exports = bayesian;
