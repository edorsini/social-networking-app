var WallPost = require('../models/wallpost');
var Profile = require('../models/profile');

module.exports = {
    get: function (req, res) {
        WallPost.find({userId:req.params.userId}).populate('poster').populate('comments.user').exec(function (err, result) {
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
		
        var profile = Profile.findOne({
            user:req.user
        }, function(err, profile) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            
            if (!profile) {
                return res.status(400).send({
                    message: 'Profile required to make wall posts'
                });
            }
            
            req.body.poster = profile;
			
			// Setting the dateAndTime for the makepost()
			var date_now = new Date(Date.now());
			var date = date_now.toDateString() +',' + date_now.toTimeString().substring(0,5);
			req.body.dateAndTime = date
			
			// console.log('Sent data: ', req.body);
			
            var wallPost = new WallPost(req.body);

            wallPost.save(function (err) {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    }
};