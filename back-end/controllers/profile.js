var Profile = require('../models/profile');

module.exports = {
    get: function (req, res) {
        Profile.find({}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
            });
    },
    post: function(req, res) {
        console.log(req.body);

        //req.body.user = req.user;

        //var profile = new Profile(req.body);

        //profile.save();

        res.status(200);
    }
};
