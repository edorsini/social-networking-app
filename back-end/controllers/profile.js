var Profile = require('../models/profile');

module.exports = {
    get: function (req, res) {
        Profile.findOne(
            {user: req.params.userId},
            function(err, result) {
                res.send(result);
            });
    },
    post: function(req, res) {
        req.body.user = req.user;

        Profile.findOne(
            {user: req.user},
            function(err, profile) {
                if (!profile) {
                    profile = new Profile(req.body);
                } else {
                    profile.firstname = req.body.firstname;
                    profile.lastname = req.body.lastname;
                    profile.email = req.body.email;
                    profile.gender = req.body.gender;
                    profile.birthday = req.body.birthday;
                    profile.location = req.body.location;
                }
                
                profile.save();
            });

        res.sendStatus(200);
    }
};
