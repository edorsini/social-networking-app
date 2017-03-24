/**
 * Back-end controller for the profile picture.
 */

var User = require('../models/user');

module.exports = {
    /**
     * Gets this user's friends.
     */
    getFriends: function(req, res) {
        // This console.log message gets printed on the node server command line screen
        console.log("GET: gets to get function in back-end/controllers/friend.js");
        userName = req.params.user_name;
        console.log("username = " + userName);
        // Query to find all the friends for this user
        User.find({ "username": userName }).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },
    
    post: function(req,res){
        User.update( {"username": "rob"}, {$addToSet : {"friends" : { "username" : "edorsini","firstname" : "Ed","lastname" : "Orsini"}}});
        res.sendStatus(200);
    },


    testing: function(req, res) {
        // This console.log message gets printed on the node server command line screen
        console.log("GET: gets to get TESTING function in back-end/controllers/friend.js");
    },


};
