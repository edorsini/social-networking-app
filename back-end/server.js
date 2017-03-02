var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

// Profile picture upload -- edorsini
var multer = require('multer');
var crypto = require('crypto');

//var upload = multer({ dest: '../front-end/src/assets/images/uploads' });
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


// Require all the necessary controllers -- edorsini

var path = require('path'); // edorsini

//app.use(express.static(path.join(__dirname, './uploads'))); // edorsini
//app.use('/img', express.static(path.join(__dirname, 'public')));
//app.use(express.static('/uploads')); // edorsini

var auth = require('./controllers/auth');
var message = require('./controllers/message');
var picture = require('./controllers/picture');
//var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//middleware
app.use(bodyParser.json());
//app.use(function (req, res, next) {
//res.header("Access-Control-Allow-Origin", "*");
//res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//next();
//})

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

//requests
app.get('/api/message', message.get);
app.post('/api/message', checkAuthenticated, message.post);

/*********************** Picture related */
app.get('/api/pictures', picture.get); // edorsini
// TODO: need to add checkAuthenticated method!!
//app.post('/api/picture', upload.any(), picture.post); // edorsini
app.post('/api/picture', upload.single('myFile'), picture.post); // edorsini
/************************/

app.post('/auth/login', auth.login);
app.post('/auth/register', auth.register);

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
