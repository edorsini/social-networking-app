var WallPost = require('../models/wallPost');

module.exports = {
    get: function (req, res) {
        WallPost.find({userId:req.params.userId}).populate('poster', '-pwd').exec(function (err, result) {
            res.send(result);
        });
    },
    post: function (req, res) {
        req.body.userId = req.params.userId;
        req.body.poster = req.user;
        
        var wallPost = new WallPost(req.body);

        wallPost.save();
        
        res.sendStatus(200);
    }
};