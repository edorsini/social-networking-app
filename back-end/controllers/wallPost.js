var WallPost = require('../models/wallPost');

module.exports = {
    get: function (req, res) {
        WallPost.find({user:req.user}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
            });
    },
    post: function(req, res) {
        console.log("hey");
        console.log(req.body, req.user);

        req.body.user = req.user;

        var wallPost = new WallPost(req.body);

        wallPost.save();

        res.sendStatus(200);
    },

};