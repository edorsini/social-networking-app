/**
 * Back-end controller for the profile picture.
 */

var Picture = require('../models/message');

module.exports = {
    /**
     * Gets all profile images.
     */
    get: function(req, res) {
        console.log("gets to get function in back-end/controllers/picture.js");
        Picture.find({}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },
    /**
     * Uploads a profile picture.
     */
    post: function(req, res) {
        //res.send(req.files);
        res.send("Your profile picture has been uploaded.");

        // console.log("gets to the back-end picture controller...");
        // console.log(req.body, req.user);

        // req.body.user = req.user;

        // var picture = new Message(req.body);

        // picture.save();

        // res.status(200);
    }
};
