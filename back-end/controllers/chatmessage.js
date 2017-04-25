var ChatMessage = require('../models/chatmessage'); 

module.exports = {
    get: function (req, res) {
        ChatMessage.find({}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
            });
    },
    post: function(req, res) {
        console.log(req.body, req.user);

        req.body.user = req.user;
        
        var chatmessage = new ChatMessage(req.body);

        chatmessage.save();

        res.status(200);
    }
};
