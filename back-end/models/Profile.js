var mongoose = require('mongoose');

module.exports = mongoose.model('Profile', {
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    firstname: String,
    lastname: String,
    email: {type: mongoose.Schema.ObjectId, ref: 'User'},
    gender: String,
    birthday: String,
    country: String
});
