/**
 * Back-end controller for the friends feature.
 */

var User = require('../models/user');
var Profile = require('../models/profile');
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    /**
     * Gets this user's friends.
     */
    getFriends: function(req, res) {
        // Query to find all the friends for this user
        User.findById(req.user).populate('friends').exec(function (err, result) {
            res.send(result.friends);
        });
    },

    /**
     * Adds two users as friends based on a friend request
     */
    post: function(req, res) {
        var user = req.body.friendRequest.user;
        var requester = req.body.friendRequest.requester.user;
        
        console.log(user,requester)
        Profile.findOne({ "user":user }).exec()
        .then(function (result) {
            return User.findByIdAndUpdate(requester, { $addToSet: { "friends": result._id } }).exec();
        })
        .then(function () {
            return Profile.findOne({ "user":requester }).exec()
        })
        .then(function (result) {
            return User.findByIdAndUpdate(user, { $addToSet: { "friends": result._id } }).exec();
        })
        .then(function () {
            res.sendStatus(200);
        });
    },

    /**
     * Removes a particular friend from a user's profile.
     */
    removeFriend: function(req, res) {
        var userId = req.user;
        var friendId = req.params.friend_id;
        
        Profile.findOne({ "user": friendId }).exec()
        .then(function (result) {
            return User.findByIdAndUpdate(userId, { $pull: { "friends": result._id } }).exec()
        })
        .then(function () {
            return Profile.findOne({ "user": userId }).exec();
        })
        .then(function (result) {
            return User.findByIdAndUpdate(friendId, { $pull: { "friends": result._id } }).exec();
        })
        .then(function () {
            res.sendStatus(200);
        });
    }
};
