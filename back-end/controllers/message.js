var Message = require('../models/message');

module.exports = {
    get: function(req, res) {
        Message.find({}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },
    post: function(req, res) {
        //alert("gets to back-end controller message.js");
        console.log("gets to back-end controller message.js");
        console.log(req.body, req.user);

        req.body.user = req.user;

        var message = new Message(req.body);

        message.save();

        res.status(200);
    }
};
