var PostComment = require('../models/PostComment');
var WallPost = require('../models/WallPost');
var mongoose = require('mongoose');
var Profile = require('../models/Profile');


module.exports = {
    get: function (req, res) {
        PostComment.find({}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },
	
    post: function(req, res) {
        // console.log('postComment req: ',req.body, req.user);
		var comment = req.body.msg;
		var postid = req.body.postId;
		var date_now = new Date(Date.now());
		var date = date_now.toDateString() +',' + date_now.toTimeString().substring(0,5);
		
        Profile.findOne({user: req.user}).exec()
        .then(function (result) {
            return WallPost.findByIdAndUpdate(
                postid,
                {$push:{ "comments": {commentMsg: comment, user: result, date: date}}},
                {upsert: true})
                .exec();
        })
        .then(function () {
            res.sendStatus(200);
        });
    }
};