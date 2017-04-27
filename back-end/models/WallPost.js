var mongoose = require('mongoose');

module.exports = mongoose.model('Wall', {
    postId: String,
    postMsg: String,
    userId: String,
    poster: {type: mongoose.Schema.ObjectId, ref: 'Profile'},
	comments : [{
        commentMsg: String,
        user : {type: mongoose.Schema.ObjectId, ref: 'Profile'},
        date : String
    }],
    dateAndTime: String,
});