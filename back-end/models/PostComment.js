var mongoose = require('mongoose');

module.exports = mongoose.model('Wall', {
    commentMsg: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    dateAndTime: String,
});