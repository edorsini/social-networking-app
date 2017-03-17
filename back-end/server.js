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
var NicoChatCtrl = require('./controllers/nicochatmessage');
var Chat = require('./controllers/chatmessage');
var auth = require('./controllers/auth');
var Message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//connection -> To DB
mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
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

//middleware
app.use(bodyParser.json());
app.use(cors);
app.use(express.static(__dirname + '/public'));
// uncomment after placing favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/api/chat/msgs', NicoChatCtrl.get);
app.get('/api/chat', Chat.get );
app.post('/api/chat', checkAuthenticated, Chat.post);

/*
app.post('/api/chat', function(req,res) {
    console.log(req.body);
    
    res.status(200);
});
*/
app.get('/api/message', Message.get);
app.post('/api/message',checkAuthenticated, Message.post);
app.post('/auth/login', auth.login);
app.post('/auth/register', auth.register);

// Socket.io Communication
//io.sockets.on('connection', require('./routes/socket'));

//io.sockets.on('connection', socket);


//=======
//Inserting Test Chat Data
//=======
//Uncomment when ready to test
/*
app.post('/setup', function(req, res) {
  //Array of chat data. Each object properties must match the schema object properties
  var chatData = [{
    created: new Date(),
    content: 'Hi',
    username: 'Chris',
    room: 'general'
  }, {
    created: new Date(),
    content: 'Hello',
    username: 'Obinna',
    room: 'general'
  }, {
    created: new Date(),
    content: 'Ait',
    username: 'Bill',
    room: 'general'
  }, {
    created: new Date(),
    content: 'Amazing room',
    username: 'Patience',
    room: 'general'
  }];

  //Loop through each of the chat data and insert into the database
  for (var c = 0; c < chatData.length; c++) {
    //Create an instance of the chat model
    var newChat = new Chat(chatData[c]);
    //Call save to insert the chat
    newChat.save(function(err, savedChat) {
      console.log(savedChat);
    });
  }
  //Send a resoponse so the serve would not get stuck
  res.send('created');
});


//This route makes a list of chat filtered by room query
//User this to send an array of JSON objects to 
//the client which contain chat history
/*
app.get('/api/chat/msgs', function(req, res) {
  //Find
    //ChatMessage.find({}).populate('user', '-pwd').exec(function(err, result) {
            //res.send(result);
  ChatMessageModel.find({}).'room': req.query.room({}).populate('user', '-pwd').exec(function(err, result) {
    //Send
    res.send(result);
  });
});
*/


/*[[[[[[[[ - START SOCKETS - ]]]]]]]]*/
/*
io.on('connection', function(socket) {
    //Global variables
    var defaultRoom = 'General';
    var rooms  = ["general", "Cafe", "Ferrari Lounge", "Batcave", "Fabio Enclave"];
    
    //Emits the rooms array
    socket.emit('setup', {
        rooms:rooms
    });
    
    //Listens for a new User
    socket.on('new user', function(data) {
        data.room = defaultRoom;
        //New User joins the default room
        socket.join(defaultRoom);
        //Tell all those in the room that a new user joined
        io.in(defaultRoom).emit('user joined', data);
    });
    
    //Listens for a room switch
    socket.on('switch room', function(data) {
        //Handles the joining and leaving of rooms
        //console.log(data);
        socket.leave(data.oldRoom);
        socket.join(data.newRoom);
        io.in(data.oldRoom).emit('user left', data);
        io.in(data.newRoom).emit('user joined', data);
    });
    
    //Listens for a new chat message
    socket.on('new message', function(data) {
        //Create message
        var newMsg = new Chat({
            username: data.username,
            content: data.message,
            room: data.room.toLowerCase(),
            created: new Date()
        });
        //Save it to the database
        newMsg.save(function(err, msg){
            //Send message to thos connected in the room
            io.in(msg.room).emit('message created', msg);
        });
    });
});*/
/*[[[[[[[[[[ - END SOCKETS - ]]]]]]]]]]*/
var NicoChatMessage = require('./models/nicochatmessage');
//var socket = require('./routes/socket');

//io.sockets.on('connection', socket);

io.on('connection', function(socket) {
  console.log('new connection from the client');
    //Global Vars
    var defaultRoom = 'general';
    var rooms  = ["general", "Cafe", "Ferrari Lounge", "Batcave", "Fabio Enclave"];
    
    console.log('New connection from the chat client.');
    
     //Emit the rooms array
    socket.emit('setup', {
        rooms: rooms,
        initroom: defaultRoom
    });
    
    //Listens for new user
      socket.on('new-user', function(data) {
        console.log("newUser Function: " + data);
        data.room = defaultRoom;
        //New user joins the default room
        socket.join(defaultRoom);
        //Tell all those in the room that a new user joined
        io.in(defaultRoom).emit('user joined', data);
      });
    
     //Listens for switch room
      socket.on('switch room', function(data) {
          console.log("SwitchRoom funct: " + data);
        //Handles joining and leaving rooms
        //console.log(data);
        socket.leave(data.oldRoom);
        socket.join(data.newRoom);
        io.in(data.oldRoom).emit('user left', data);
        io.in(data.newRoom).emit('user joined', data);
      });
    /*
    socket.on('add-customer', function(customer, rooms) {
        console.log(customer); 
        io.emit('notification', {
          message: 'new customer',
          customer: customer
        });
        //io.emit('rooms', rooms);
    });
    */
    
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
        newMsg.save(function(err, msg){
            //Send message to those connected in the room
            io.emit('message Created', msg);
        });
        console.log("Sending..." + newMsg);
        io.emit('chat-notification', {
            msg: data.msg,
            chatname: data.chatname,
            created: newMsg.created,
            room: data.room
            });
    });
    
    
    
    socket.on('disconnect', function(){  
        console.log('user disconnected');  
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
    
    



