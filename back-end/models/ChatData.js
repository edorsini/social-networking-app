var mongoose = require('mongoose');

module.exports = mongoose.model('ChatData', {
    msg: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});