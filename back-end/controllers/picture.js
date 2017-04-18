/**
 * Back-end controller for the profile picture.
 */

var Picture = require('../models/picture');
var mongoose = require('mongoose');

module.exports = {
    /**
     * Gets all profile images.
     */
    get: function(req, res) {
        // This console.log message gets printed on the node server command line screen
        console.log("GET: gets to get function in back-end/controllers/picture.js");

        // Query to find all the image files
        Picture.find({}).populate('user', '-pwd').exec(function(err, result) {
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
     * Call-back function after the image has been uploaded by Multer.
     */
    post: function(req, res) {
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
        console.log("the user is: " + req.body.user);

        // Create the new `Picture` object

        var file = new Picture({
            originalname: originalname,
            filename: filename,
            path: path,
            destination: destination,
            size: size,
            mimetype: mimetype,
            user: req.body.user
        });

        console.log("POST: gets to the back-end picture controller...");

        // Save the file
        file.save();

        // works!
        //res.send(myFile);

        //res.sendFile("/#/picture");

        // works!
        res.redirect('http://localhost:3000/#/picture');


        // Return status code
        //res.status(200);
    }
};
