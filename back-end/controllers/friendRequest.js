var FriendRequest = require('../models/friendrequest');
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
        FriendRequest.find({ user: req.user }).populate('user', '-pwd').exec(function(err, result) {res.send(result);});
    },
    /**
     * finds the user object of the current logged in user
     * and we link it to the username of the user who's profile
     * we are currently viewing. That way when they log in the
     * get method above will pick up this request and it'll
     * have the requesting user's info
     */
    post: function(req, res) {
        var ObjectId = require("mongoose").Types.ObjectId;
        User.findOne({ _id: new ObjectId(req.params.user_id)}).populate('user', '-pwd').exec(function(err, user) {
           Profile.findOne({ user: new ObjectId(req.user) }, function(err, friend) {
                var reqObj = { firstName:friend.firstname, reqUser:friend.user, user: user };
                friendRequest = new FriendRequest(reqObj);
                friendRequest.save(function() {res.sendStatus(200);});
            });

        });
    },
    delete: function(req, res) {
      var ObjectId = require("mongoose").Types.ObjectId;
      FriendRequest.collection.remove({"_id":new ObjectId(req.body.id)}); 
      res.sendStatus(200);
    },
    
    requestExists(req, res) {
         var requestExists =  false;
         var alreadyFriends = false;
         var ObjectId = require("mongoose").Types.ObjectId;
         FriendRequest.find({ user: new ObjectId(req.params.profUser), reqUser: new ObjectId(req.user)}).populate('user', '-pwd').exec(function(err, result) {
             requestExists = !(result.length===0);
             console.log("checking for req");
             console.log(requestExists);
             //res.send(sendReq);
         });
        
        User.find({"_id":new ObjectId(req.params.profUser)},{"friends":{$elemMatch:{"user":new ObjectId(req.user)}}}).exec(function(err,result){
            console.log("checking if friends");
            console.log(result[0].friends);
            alreadyFriends = !(result[0].friends.length===0);
            console.log(alreadyFriends);
        });
        
        res.send(requestExists && alreadyFriends);
        
    },
};
