var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email: String,
    username: String,
    friends: [{type: mongoose.Schema.ObjectId, ref: 'Profile'}],
    pwd: String,
    facebook: String,
    google: String,
});
