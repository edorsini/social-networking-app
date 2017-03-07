var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');
var io = require('socket.io').listen(server);
var nicoport = 5000;

//service vars

var Chat = require('./controllers/chatmessage');

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

/*
var socket = require('./routes/socket');
*/


//var nicoroutes = require('./controllers/nicosockets');

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
app.use(express.static(__dirname + '/public'));
// uncomment after placing favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.static)(__dirname + '/index.html');
//app.use(nicoroutes);
/*
app.get('/api/chatmessage', function (req, res {
    'use strict';
                                       
    res.send(chatmessage);
});
                                       }
app.post('/api/chatmessage', function (req, res) {
    'use strict';
    
    if(!req.body) {
        return res.sendStatus(400);
    }
    chatmessage.push(req.body);
    
    return res.sendStatus(200);
});
/*
*/

app.get('/api/chat', Chat.get );
app.post('/api/chat', checkAuthenticated, Chat.post);

/*
app.post('/api/chat', function(req,res) {
    console.log(req.body);
    
    res.status(200);
});
*/
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
    database = db;
});


/*
io.on('connection', function(socket) {  
    console.log('Client connected to socket...');
    
    var nicotestchatmessage = [
        {
            'title': 'This is a chat message!',
            'desc': 'How awesome is this'
        },
        {
            'title': 'This is another chat message!',
            'desc': 'this is even cooler than before bro'
        }
    ];
    
    //send news over the socket
    socket.emit('nicotestchatmessage', nicotestchatmessage);

    /*socket.on('join', function(data) {
        console.log(data);
    });
});
*/
// Socket.io Communication
//io.sockets.on('connection', require('./routes/socket'));
//io.sockets.on('connection', socket);

io.on('connection', function(socket) {
  console.log('new connection from the client');

  socket.on('add-customer', function(customer) {
    console.log(customer); 
    io.emit('notification', {
      message: 'new customer',
      customer: customer
    });
  });
});

server.listen(nicoport, function() {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});

//app.use('/static', express.static('node_modules'));
/*
io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");

    var news = [
        { title: 'The MAtrix is here michael chael',date:'04.10.2016'},
        { title: 'Batman saves Racoon City, the Joker is infected once again',date:'05.10.2016'},
        { title: "Deadpool doesn't want to do a third part of the franchise",date:'05.10.2016'},
        { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',date:'04.10.2016'},
    ];
    
    var fabioAnnouncements = [{ title: 'Welcome to Friend Zone!',date:'04.10.2016'}];

    // Send news on the socket
    socket.emit('news', news);
    socket.emit('fabioAnnouncements', fabioAnnouncements)

    socket.on('my other event', function (data) {
        console.log(data);
    });
    
    var rooms = [
        {title: 'Batcave', dateCreated: '2.26.2017'},
        {title: 'Ferrari Lounge', dateCreated: '2.25.2017'},
    ];
    
        
        
    });
//});
/*======
CHAT
=======*/
/*  

var apptwo = express();

var chatserver = http.createServer(apptwo);
// Pass a http.Server instance to the listen method
var io = require('socket.io').listen(server);

// The server should start listening
server.listen(80);

// Register the index route of your app that returns the HTML file
app.get('/', function (req, res) {
    console.log("Homepage");
    res.sendFile(__dirname + '/index.html');
});

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

// Handle connection
io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");

    var news = [
        { title: 'The cure of the Sadness is to play Videogames',date:'04.10.2016'},
        { title: 'Batman saves Racoon City, the Joker is infected once again',date:'05.10.2016'},
        { title: "Deadpool doesn't want to do a third part of the franchise",date:'05.10.2016'},
        { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',date:'04.10.2016'},
    ];

    // Send news on the socket
    socket.emit('news', news);

    socket.on('my other event', function (data) {
        console.log(data);
    });
});

*/
    
    



var server = app.listen(5000, function() {
    console.log('listening on port ', server.address().port)
});
