/**
 * Back-end controller for the friends feature.
 */

var User = require('../models/user');
var Profile = require('../models/profile');

module.exports = {
    /**
     * Gets this user's friends.
     */
    getFriends: function(req, res) {
        userid = req.user;
        // Query to find all the friends for this user
        var ObjectId = require("mongoose").Types.ObjectId;
        User.find({ "_id": new ObjectId(userid) }).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },

    post: function(req, res) {
        var ObjectId = require("mongoose").Types.ObjectId;
        Profile.find({ "user":req.body.friendRequest.user}).exec(function(err,result){
            User.collection.update({ "_id": new ObjectId(req.body.friendRequest.reqUser) }, {
                $addToSet: {
                    "friends": {
                        "user": result[0].user, "firstname":result[0].firstname, "lastname":result[0].lastname
                    }
                }
            });
        });
        
        Profile.find({ "user":req.body.friendRequest.reqUser}).exec(function(err,result){
            User.collection.update({ "_id": new ObjectId(req.body.friendRequest.user._id) }, {
                $addToSet: {
                    "friends": {
                        "user": result[0].user, "firstname":result[0].firstname, "lastname":result[0].lastname
                    }
                }
            });
        });
        
        res.sendStatus(200);
    },

    /**
     * Removes a particular friend from a user's profile.
     */
    removeFriend: function(req, res) {
        userId = req.user;
        friendId = req.params.friend_id;
        console.log("removing friend, USER ID: " + userid + "   FRIEND ID: " + friendId);
        var ObjectId = require("mongoose").Types.ObjectId;
        User.collection.update({ "_id": new ObjectId(userId) }, { $pull: { "friends": { "user": new ObjectId(friendId) } } });
        User.collection.update({ "_id": new ObjectId(friendId) }, { $pull: { "friends": { "user": new ObjectId(userId) } } }, function() {
            res.sendStatus(200) 
        });
    },
};
