/**
 * Back-end controller for the profile picture.
 */

var Picture = require('../models/picture');
var mongoose = require('mongoose');
var Profile = require('../models/profile');

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
	* Sets an image as a user's profile picture
	*/
	setProfilePicture: function(req, res) {
		user_picture_info = req.params.picture_id;
		user_info = user_picture_info.substring(0, user_picture_info.indexOf(":"));
		picture_info = user_picture_info.substring(user_picture_info.indexOf(":")+1);
		console.log('SetPicture', user_info);
		console.log('SetPicUser', picture_info);
		
		Picture.find({_id: new mongoose.mongo.ObjectID(picture_info)}, {_id:0, filename : 1}, function (err, picturedata) { 
			picturefilename = picturedata[0]['filename'];
			console.log('PictureData ', picturefilename);
			Profile.findOneAndUpdate({user: new mongoose.mongo.ObjectID(user_info)}, {$set : {picture : new mongoose.mongo.ObjectID(picture_info), picturefile : picturefilename}}, function(err, profiledata) {
			//console.log('ProfileData ', profiledata);
			res.sendStatus(200);
			});
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
