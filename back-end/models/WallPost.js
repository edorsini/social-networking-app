var mongoose = require('mongoose');

module.exports = mongoose.model('Wall', {
    postId: String,
    postMsg: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Schema.ObjectId, ref:'PostComment'}],
    dateAndTime: String,
});