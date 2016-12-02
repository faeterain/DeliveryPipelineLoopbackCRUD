'use strict';

module.exports = function(Review) {
    Review.beforeRemote('create', function(context, user, next) {
        console.log(123);
        context.args.data.date = Date.now();
        context.args.data.publisherId = context.req.accessToken.userId;
        next();
    });
};