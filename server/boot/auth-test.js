'use strict';

var async = require('async');
module.exports = function(app) {
    //data sources
    var mongoDs = app.dataSources.mongoDs;
    var mysqlDs = app.dataSources.mysqlDs;
    var cloudant = app.dataSources.cloudant_loopback;
    var Reviewer = app.models.Reviewer;
    //create all models

    function startMigrate() {

        console.log('> starting migrate');
        async.parallel({
            reviewers: async.apply(createReviewers),
            coffeeShops: async.apply(createCoffeeShops),
        }, function(err, results) {
            if (err) throw err;
            createReviews(results.reviewers, results.coffeeShops, function(err) {
                console.log('> models created sucessfully');
            });
        });
    }

    var checkExist = function checkExist(cb) {
        var query = { q: "*:*", limit: 10 };
        Reviewer.find(query, function(er, result) {
            console.log('> check access model');
            if (!result.length) {
                cb();
            } else {
                console.log('> models created sucessfully');
            }
        });
    }

    checkExist(startMigrate);

    //create reviewers
    function createReviewers(cb) {
        cloudant.automigrate('Reviewer', function(err) {
            if (err) return cb(err);
            var Reviewer = app.models.Reviewer;
            Reviewer.create([{
                email: 'foo@bar.com',
                password: 'foobar',
            }, {
                email: 'john@doe.com',
                password: 'johndoe',
            }, {
                email: 'jane@doe.com',
                password: 'janedoe',
            }], cb);
        });
    }
    //create coffee shops
    function createCoffeeShops(cb) {
        cloudant.automigrate('CoffeeShop', function(err) {
            if (err) return cb(err);
            var CoffeeShop = app.models.CoffeeShop;
            CoffeeShop.create([{
                name: 'Bel Cafe',
                city: 'Vancouver',
            }, {
                name: 'Three Bees Coffee House',
                city: 'San Mateo',
            }, {
                name: 'Caffe Artigiano',
                city: 'Vancouver',
            }], cb);
        });
    }
    //create reviews
    function createReviews(reviewers, coffeeShops, cb) {
        cloudant.automigrate('Review', function(err) {
            if (err) return cb(err);
            var Review = app.models.Review;
            var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
            Review.create([{
                date: Date.now() - (DAY_IN_MILLISECONDS * 4),
                rating: 5,
                comments: 'A very good coffee shop.',
                publisherId: reviewers[0].id,
                coffeeShopId: coffeeShops[0].id,
            }, {
                date: Date.now() - (DAY_IN_MILLISECONDS * 3),
                rating: 5,
                comments: 'Quite pleasant.',
                publisherId: reviewers[1].id,
                coffeeShopId: coffeeShops[0].id,
            }, {
                date: Date.now() - (DAY_IN_MILLISECONDS * 2),
                rating: 4,
                comments: 'It was ok.',
                publisherId: reviewers[1].id,
                coffeeShopId: coffeeShops[1].id,
            }, {
                date: Date.now() - (DAY_IN_MILLISECONDS),
                rating: 4,
                comments: 'I go here everyday.',
                publisherId: reviewers[2].id,
                coffeeShopId: coffeeShops[2].id,
            }], cb);
        });
    }
};