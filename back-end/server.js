var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');
var multer = require('multer'); // required for the image uploads.
var crypto = require('crypto'); // required for renaming the uploaded images.

/**
 * Helper function for renaming the uploaded images.
 */
var storage = multer.diskStorage({
    destination: '../front-end/src/assets/images/uploads',
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

var upload = multer({ storage: storage });
var path = require('path'); // required for the image uploads.
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var profile = require('./controllers/profile');
var wall = require('./controllers/wallPost');
//var comment = require('./controllers/postComment');
var checkAuthenticated = require('./services/checkAuthenticated');
var picture = require('./controllers/picture');
//var checkAuthenticated = require('./services/checkAuthenticated');

var cors = require('./services/cors');

//middleware
app.use(bodyParser.json());


app.use(cors);

function checkAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }

    var token = req.header('Authorization').split(' ')[1];

    var payload = jwt.decode(token, 'secret');

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }

    req.user = payload.sub;

    next();
}

app.use(cors);

//requests
app.get('/api/message', message.get);
app.get('/api/wall', wall.get);
//app.post('/api/comment', comment.get);
app.post('/api/wall',checkAuthenticated, wall.post);
//app.post('/api/comment', checkAuthenticated, comment.post);
app.post('/api/message', checkAuthenticated, message.post);
app.get('/api/pictures', picture.get); // Image Uploads related
// TODO: need to add checkAuthenticated method!!
//app.post('/api/picture', upload.any(), picture.post); // Image Uploads related
app.post('/api/picture', upload.single('myFile'), picture.post); // Image Uploads related
app.post('/auth/login', auth.login);
app.post('/auth/register', auth.register);
app.post('/auth/facebook', auth.facebook);
app.get('/api/profile', checkAuthenticated, profile.get);
app.post('/api/profile', checkAuthenticated, profile.post);

//connection
mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    } else {
        console.log("Can't connect to mongo");
    }
});

var server = app.listen(5000, function() {
    console.log('listening on port ', server.address().port)
});
