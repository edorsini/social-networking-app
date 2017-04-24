var Profile = require('../models/Profile');

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
                    profile.username = req.body.username;
                    profile.firstname = req.body.firstname;
                    profile.lastname = req.body.lastname;
                    profile.gender = req.body.gender;
                    profile.birthday = req.body.birthday;
                    profile.country = req.body.country;
                }
                
                profile.save();
            });

        res.sendStatus(200);
    }
};
