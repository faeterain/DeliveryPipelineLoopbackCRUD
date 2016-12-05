'use strict';

var Constants = require('../constants');

module.exports = function(Twilio) {

    Twilio.sendMessage = function(req, cb) {
        var msg = (req.body.name ? req.body.name + "'s " : "Your ") + "profile had been changed!";
        var smsData = {
            type: 'sms',
            to: '+841656237827',
            from: '+14807719323',
            body: msg
        }
        Twilio.send(smsData, function(err, data) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, Constants.Messages.OK);
            }
        });
    }

    Twilio.remoteMethod('sendMessage', {
        http: { path: '/', verb: 'post' },
        accepts: [{
            arg: 'req',
            type: 'object',
            http: function(ctx) {
                return ctx.req;
            }
        }],
        returns: { arg: 'rs', type: 'object' }
    });
};