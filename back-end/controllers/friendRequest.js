var FriendRequest = require('../models/friendrequest');
var User = require('../models/user');

module.exports = {
    /**
    * Getting friend requests from mongo. Right now
    * it's just pulling all requests for this hard coded
    * username but we should be passing in the username
    * of the user who's logged in
    */
    get: function(req, res) {
       FriendRequest.find({userName:"rob"}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },
    /**
    * finds the user object of the current logged in user
    * and we link it to the username of the user who's profile
    * we are currently viewing. That way when they log in the
    * get method above will pick up this request and it'll
    * have the requesting user's info
    */
    post: function(req,res){
       User.find({_id:req.user}).populate('user', '-pwd').exec(function(err, result) {
            var reqObj = {userName:req.params.user_name,user:result[0]};
            friendRequest = new FriendRequest(reqObj);
            friendRequest.save();
            res.sendStatus(200);
        });
    },
};
