var WallPost = require('../models/wallPost');

module.exports = {
    get: function (req, res) {
        WallPost.find({userId:req.params.userId}).populate('poster', '-pwd').exec(function (err, result) {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.send(result);
            }
        });
    },
    post: function (req, res) {
        req.body.userId = req.params.userId;
        req.body.poster = req.user;
        
        var wallPost = new WallPost(req.body);

        wallPost.save(function (err) {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    }
};