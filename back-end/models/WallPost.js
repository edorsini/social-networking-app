var mongoose = require('mongoose');

module.exports = mongoose.model('Wall', {
    postId: String,
    postMsg: String,
    userId: String,
    poster: {type: mongoose.Schema.ObjectId, ref: 'Profile'},
	comments : [
		{commentMsg: String,
		 user : String,
		 date : String
		 //date : Date,
		 //user : {type: mongoose.Schema.ObjectId, ref: 'User'}
		}],
    dateAndTime: String,
});