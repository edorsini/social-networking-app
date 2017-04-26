var PostComment = require('../models/postcomment');
var WallPost = require('../models/wallPost');
var mongoose = require('mongoose');
var Profile = require('../models/profile');


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
		
		Profile.find({user: new mongoose.mongo.ObjectID(req.user)}, {_id:0, firstname: 1}, function(err, userdata) {
			var username = userdata[0]['firstname'];
			WallPost.findOneAndUpdate({_id: new mongoose.mongo.ObjectID(postid)}, 
				{$push: {"comments": {commentMsg: comment, user: username, date: date}}}, {upsert: true}, function(err, result) {
				if (!err){
					// console.log('Updated wallpost is ', result);
				}
			});
		});
        res.sendStatus(200);
    }
};