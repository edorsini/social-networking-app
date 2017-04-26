var User = require('../models/user');
var Profile = require('../models/profile');
var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');
var config = require('../services/config.js');

module.exports = {
    register: function(req,res){
        console.log(req.body);

        User.findOne({
            email: req.body.email
        }, function(err, existingUser) {

            if(existingUser)
                return res.status(409).send({message: 'Email is already registered'});

            var user = new User(req.body);

            user.save(function(err,result){
                if(err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                
                var newProfile = new Profile();
                        newProfile.user = result;
                        newProfile.save();
                
                res.status(200).send({
                    token: createToken(result)
                });
            });
        });
    },

    login: function (req, res) {

        console.log("login back-end");

        User.findOne({
            email: req.body.email
        }, function(err, user) {

            if(!user) {
                return res.status(401).send({message: 'Email or Password is invalid'});
            }

            if (req.body.pwd == user.pwd) {
                //console.log(req.body, user.pwd)
                res.send({
                    token: createToken(user)
                });
            } else {
                return res.status(401).send({message: 'Invalid email and/or password'});
            }
        });
    },
    
    facebook: function (req, res) {
        
        console.log('login with facebook');
        
        var fields = ['id', 'email'];
        var accessTokenUrl = config.facebookTokenUrl;
        var graphApiUrl = config.facebookGraphUrl + '?fields=' + fields.join(',');
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.facebookClientSecret,
            redirect_uri: req.body.redirectUri
        };

        // Step 1. Exchange authorization code for access token.
        request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: accessToken.error.message });
            }

            // Step 2. Retrieve profile information about the user.
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
                if (response.statusCode !== 200) {
                    return res.status(500).send({ message: profile.error.message });
                }
                
                // Step 3. Create a new user account or return an existing one.
                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        var token = createToken(existingUser);
                        return res.send({ token: token });
                    }
                    
                    var user = new User();
                    user.email = profile.email;
                    user.facebook = profile.id;
                    user.save(function() {
                        var newProfile = new Profile();
                        newProfile.user = user;
                        newProfile.save();
                        
                        var token = createToken(user);
                        res.send({ token: token });
                    });
                });
            });
        });
    },
    
    google: function (req, res) {
        
        console.log('login with google');
        
        var accessTokenUrl = config.googleTokenUrl;
        var peopleApiUrl = config.googlePeopleUrl;
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.googleClientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

        // Step 1. Exchange authorization code for access token.
        request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
            var accessToken = token.access_token;
            var headers = { Authorization: 'Bearer ' + accessToken };

            // Step 2. Retrieve profile information about the user.
            request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
                if (profile.error) {
                    return res.status(500).send({message: profile.error.message});
                }
                
                // Step 3. Create a new user account or return an existing one.
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                        var token = createToken(existingUser);
                        return res.send({ token: token });
                    }
                    
                    var user = new User();
                    user.email = profile.email;
                    user.google = profile.sub;
                    user.save(function() {
                        var newProfile = new Profile();
                        newProfile.user = user;
                        newProfile.save();
                        
                        var token = createToken(user);
                        res.send({ token: token });
                    });
                });
            });
        });
    }
};

function createToken(user){
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, 'secret');
}
