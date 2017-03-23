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
        console.log("GET: gets to get function in back-end/controllers/friend.js");
        username = req.params.user_name;
        console.log("username = " + username);
        // Query to find all the friends for this user
        User.find({ "username": username }).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },

    testing: function(req, res) {
        // This console.log message gets printed on the node server command line screen
        console.log("GET: gets to get TESTING function in back-end/controllers/friend.js");
    },

    removeFriend: function(req, res) {
        // TODO
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
