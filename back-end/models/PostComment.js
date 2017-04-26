var mongoose = require('mongoose');

module.exports = mongoose.model('PostComment', {
    commentMsg: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    dateAndTime: String,
});