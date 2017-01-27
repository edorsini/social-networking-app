var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    msg: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});
