/**
 * Back-end controller for the friends feature.
 */

var User = require('../models/user');

module.exports = {
    /**
     * Gets this user's friends.
     */
    getFriends: function(req, res) {
        // This console.log message gets printed on the node server command line screen
        userid = req.user;
        // Query to find all the friends for this user
        var ObjectId = require("mongoose").Types.ObjectId;
        User.find({ "_id": new ObjectId(userid) }).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },

    post: function(req, res) {
        console.log(req.body.friendRequest);
        User.collection.update({ "username": req.body.friendRequest.userName }, { $addToSet: { "friends": { "username": req.body.friendRequest.user.username}}});
        User.collection.update({ "username": req.body.friendRequest.user.username}, { $addToSet: { "friends": { "username": req.body.friendRequest.userName }}});
        res.sendStatus(200);
    },

    /**
     * Removes a particular friend from a user's profile.
     */
    removeFriend: function(req, res) {
        userid = req.user;
        friendUsername = req.params.friend_name;
        var ObjectId = require("mongoose").Types.ObjectId;
        User.collection.update({ "_id": new ObjectId(userid) }, { $pull: { "friends": { "username": friendUsername } } }, function() { res.sendStatus(200) });
    },

    acceptFriend: function(req, res) {
        // TODO
    },

    getPendingFriends: function(req, res) {
        // TODO
    },

    requestFriend: function(req, res) {
        // TODO
    },


};
