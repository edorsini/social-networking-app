var FriendRequest = require('../models/FriendRequest');
var User = require('../models/user');
var Profile = require('../models/profile');

module.exports = {
    /**
     * Getting friend requests from mongo. Right now
     * it's just pulling all requests for this hard coded
     * username but we should be passing in the username
     * of the user who's logged in
     */
    get: function(req, res) {
        console.log(req.user);
        Profile.findOne({ user: req.user }).populate('user', '-pwd').exec(function(err, user) {
            FriendRequest.find({ userName: user.username }).populate('user', '-pwd').exec(function(err, result) {
                res.send(result);
            });
        });
    },
    /**
     * finds the user object of the current logged in user
     * and we link it to the username of the user who's profile
     * we are currently viewing. That way when they log in the
     * get method above will pick up this request and it'll
     * have the requesting user's info
     */
    post: function(req, res) {
        User.findOne({ _id: req.user }).populate('user', '-pwd').exec(function(err, user) {
            console.log(JSON.stringify(user));
            var ObjectId = require("mongoose").Types.ObjectId;
            Profile.findOne({ user: new ObjectId(req.params.user_id) }, function(err, friend) {
                console.log(JSON.stringify(friend));
                var reqObj = { userName: friend.username, user: user };
                friendRequest = new FriendRequest(reqObj);
                friendRequest.save(function() {
                    res.sendStatus(200);
                });
            });

        });
    },
    delete: function(req, res) {
      var ObjectId = require("mongoose").Types.ObjectId;
      FriendRequest.collection.remove({"_id":new ObjectId(req.body.id)}); 
      res.sendStatus(200);
    },
};
