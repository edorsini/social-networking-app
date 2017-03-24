var FriendRequest = require('../models/friendrequest');
var User = require('../models/user');

module.exports = {
    get: function(req, res) {
       FriendRequest.find({}).populate('user', '-pwd').exec(function(err, result) {
            //console.log(result);
            res.send(result);
        });
    },
    post: function(req,res){
        console.log("?");
       User.find({$or:[{username:"rob"},{username:"rob2"}]}).populate('user', '-pwd').exec(function(err, result) {
            var reqObj = {user:(result[0]._id !=  req.user)?result[0]:result[1],reqUser:(result[0]._id ===  req.user)?result[0]:result[1]};
            friendRequest = new FriendRequest(reqObj);
            friendRequest.save();
            res.sendStatus(200);
        });
    },
};
