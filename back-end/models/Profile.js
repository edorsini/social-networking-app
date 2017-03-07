var mongoose = require('mongoose');

module.exports = mongoose.model('Profile', {
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    username: String,
    firstname: String,
    lastname: String,
    gender: String,
    birthday: String,
    country: String
});
