'use strict';

module.exports = function(Reviewer) {
    Reviewer.disableRemoteMethod("login", true);
};