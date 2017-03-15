/**
 * Back-end controller for the profile picture.
 */

var Picture = require('../models/picture');

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

        res.send(myFile);

        console.log("POST: gets to the back-end picture controller...");
        console.log(req.body, req.user);

        // Get the user
        req.body.user = req.user;

        // Create the new `Picture` object

        var file = new Picture({
            originalname: originalname,
            filename: filename,
            path: path,
            destination: destination,
            size: size,
            mimetype: mimetype
        });

        // Save the file
        file.save();

        // Return status code
        res.status(200);
    }
};
