var mongoose = require('mongoose');

module.exports = mongoose.model('Profile', {
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    firstname: String,
    lastname: String,
    email: String,
    gender: String,
    birthday: String,
    location: String,
	picture: { type: mongoose.Schema.ObjectId, ref: 'Picture'},
	picturefile : String
});
