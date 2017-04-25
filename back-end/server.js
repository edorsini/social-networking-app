var http = require('http');
var express = require('express');
//var compression = require('compression');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');
var multer = require('multer'); // required for the image uploads.
var crypto = require('crypto'); // required for renaming the uploaded images.
var io = require('socket.io').listen(server);
var nicoport = 5000;
var path = require('path'); // required for the image uploads.

var Picture = require('./models/picture');

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

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            var err = new Error();
            err.code = 'filetype';
            return callback(err);
        }
        callback(null, true)
    },
    limits: {
        fileSize: 10000000
    },
}).single('myFile');

var auth = require('./controllers/auth');
var Message = require('./controllers/message');
var profile = require('./controllers/profile');
var wall = require('./controllers/wallPost');
var search = require('./controllers/search');
//var comment = require('./controllers/postComment');
var NicoChatCtrl = require('./controllers/nicochatmessage');
var Chat = require('./controllers/chatmessage');
var checkAuthenticated = require('./services/checkAuthenticated');
var picture = require('./controllers/picture');
//var checkAuthenticated = require('./services/checkAuthenticated');

var cors = require('./services/cors');

var friend = require('./controllers/friend');
var request = require('./controllers/friendRequest');

//middleware
app.use(bodyParser.json());
app.use(cors);
//app.use(compression);

//connection -> To DB
mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    } else {
        console.log("Can't connect to mongo");
    }
    database = db;
});
/*
var socket = require('./routes/socket');
*/
//var nicoroutes = require('./controllers/nicosockets');


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

app.use(express.static(__dirname + '/public'));
// uncomment after placing favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//requests
app.get('/api/message', Message.get);
app.get('/api/wall/:userId', wall.get);
//app.post('/api/comment', comment.get);
app.post('/api/wall/:userId', checkAuthenticated, wall.post);
//app.post('/api/comment', checkAuthenticated, comment.post);
app.post('/api/message', checkAuthenticated, Message.post);

// TODO: need to add checkAuthenticated method!!
//app.post('/api/picture', upload.any(), picture.post); // Image Uploads related
// Upload related
app.get('/api/pictures/:userId', picture.get);

app.post('/api/picture', function(req, res) {
    upload(req, res, function(err) {
        if (req.file === undefined) {
            var err = new Error();
            err.code = 'empty';
        }

        if (err) {
            console.log('there was an upload error!');
            if (err.code === 'filetype') {
                res.sendFile(__dirname + '/errors/invalidExt.html');
            } else if (err.code === "LIMIT_FILE_SIZE") {
                res.sendFile(__dirname + '/errors/invalidSize.html');
            } else if (err.code === "empty") {
                res.sendFile(__dirname + '/errors/empty.html');
            }
            return
        }
        picture.post(req, res);
    })
});

app.post('/api/picture/remove/:picture_id', checkAuthenticated, picture.removePicture);
app.post('/api/picture/setprofilepicture/:picture_id', checkAuthenticated, picture.setProfilePicture);

// Chat related
app.get('/api/chat/msgs', NicoChatCtrl.get);
app.get('/api/chat', Chat.get);
app.post('/api/chat', checkAuthenticated, Chat.post);

// Auth related
app.post('/auth/login', auth.login);
app.post('/auth/register', auth.register);
app.post('/auth/facebook', auth.facebook);
app.post('/auth/google', auth.google);

// Profile related
app.get('/api/profile/:userId', checkAuthenticated, profile.get);
app.post('/api/profile', checkAuthenticated, profile.post);
app.get('/api/search/:searchTerm/:searchString', checkAuthenticated, search.get);

// Friends related
app.get('/api/friends', checkAuthenticated, friend.getFriends);
app.post('/api/friends/remove/:friend_name', checkAuthenticated, friend.removeFriend);
app.post('/api/friends/', checkAuthenticated, friend.post);
app.get('/api/friendrequest', checkAuthenticated, request.get);
app.post('/api/friendrequest/:user_id', checkAuthenticated, request.post);
app.post('/api/removerequest/', checkAuthenticated, request.delete);

/*[[[[[[[[ - START SOCKETS - ]]]]]]]]*/

var NicoChatMessage = require('./models/nicochatmessage');
//var socket = require('./routes/socket');

//io.sockets.on('connection', socket);

io.on('connection', function(socket) {
    console.log('new connection from the client');
    //Global Vars
    var defaultRoom = 'general';
    var rooms = ["general", "Cafe", "Ferrari Lounge", "Batcave", "Fabio Enclave"];

    console.log('New connection from the chat client.');

    //Emit the rooms array
    socket.emit('setup', {
        rooms: rooms,
        initroom: defaultRoom
    });

    //Listens for new user
    socket.on('new-user', function(data) {
        console.log("newUser Function: " + data);
        defaultRoom = data.room;
        //New user joins the default room
        socket.join(defaultRoom);
        //Tell all those in the room that a new user joined
        io.in(defaultRoom).emit('user-joined', data);
    });

    //Listens for switch room
    socket.on('switch-room', function(data) {
        console.log("SwitchRoom funct: " + data);
        //Handles joining and leaving rooms
        //console.log(data);
        socket.leave(data.oldRoom);
        socket.join(data.newRoom);
        io.in(data.oldRoom).emit('user left', data);
        io.in(data.newRoom).emit('user joined', data);
    });

    //listens for new chat message, then saves in DB
    socket.on('new message', function(data) {
        console.log(data);

        //create a message
        var newMsg = new NicoChatMessage({
            created: new Date(),
            msg: data.msg,
            room: data.room,
            chatname: data.chatname
        });

        //Save to the database
        newMsg.save(function(err, msg) {
            //Send message to those connected in the room
            io.in(msg.room).emit('message Created', msg);
        });

        console.log("Sending... \n" + newMsg);
        io.emit('chat-notification', {
            msg: data.msg,
            chatname: data.chatname,
            created: newMsg.created,
            room: data.room
        });
    });

    //Disconnect From Socket
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

});

/*[[[[[[[[[[ - END SOCKETS - ]]]]]]]]]]*/

server.listen(nicoport, function() {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});
