var WallPost = require('../models/wallPost');

module.exports = {
    get: function (req, res) {
        WallPost.find({userId:req.params.userId}).populate('poster', '-pwd').exec(function (err, result) {
            console.log(JSON.stringify(result, null, 2));
            res.send(result);
        });
    },
    post: function (req, res) {
        req.body.userId = req.params.userId;
        req.body.poster = req.user;
        console.log(JSON.stringify(req.body, null, 2));
        var wallPost = new WallPost(req.body);

        wallPost.save(function () {
            res.sendStatus(200);
        });
    }
};