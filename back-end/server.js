var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

//service vars
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//middleware
app.use(bodyParser.json());
app.use(cors);

//requests
app.get('/api/message', message.get);
app.post('/api/message',checkAuthenticated, message.post);
app.post('/auth/login', auth.login);
app.post('/auth/register', auth.register);
app.post('/auth/facebook', auth.facebook);

//connection
mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("we are connected to mongo");
    } else {
        console.log("Can't connect to mongo");
    }
});

var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port)
});