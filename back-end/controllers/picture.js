/**
 * Back-end controller for the profile picture.
 */

var Picture = require('../models/Picture');
var mongoose = require('mongoose');
var Profile = require('../models/Profile');

module.exports = {
    /**
     * Gets all profile images.
     */
    get: function(req, res) {
        Picture.find({ user: req.params.userId },
            function(err, result) {
                res.send(result);
            });
    },

    /**
     * Deletes an image from a user's image gallery.
     */
    removePicture: function(req, res) {
        imageId = req.params.picture_id;
        Picture.findOneAndRemove({ _id: new mongoose.mongo.ObjectID(imageId) }, function() {
            res.sendStatus(200);
        });
    },

    /**
     * Sets an image as a user's profile picture
     */
    setProfilePicture: function(req, res) {
        user_picture_info = req.params.picture_id;
        user_info = user_picture_info.substring(0, user_picture_info.indexOf(":"));
        picture_info = user_picture_info.substring(user_picture_info.indexOf(":") + 1);

        Picture.find({ _id: new mongoose.mongo.ObjectID(picture_info) }, { _id: 0, filename: 1 }, function(err, picturedata) {
            picturefilename = picturedata[0]['filename'];
            Profile.findOneAndUpdate({ user: new mongoose.mongo.ObjectID(user_info) }, { $set: { picture: new mongoose.mongo.ObjectID(picture_info), picturefile: picturefilename } }, function(err, profiledata) {
                res.sendStatus(200);
            });
        });
    },

    /**
     * Call-back function after the image has been uploaded by Multer.
     */
    post: function(req, res, err) {
        var myFile = req.file;

        // Get image metadata
        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        // Get the user
        req.body.user = req.params.userId;

        Picture.findOne({ user: req.body.currentUser },
            function(err, file) {

                file = new Picture({
                    originalname: originalname,
                    filename: filename,
                    path: path,
                    destination: destination,
                    size: size,
                    mimetype: mimetype,
                    user: req.body.currentUser
                });


                file.save();
            });

        res.redirect('http://localhost:3000/#/picture');
    }
};
