var mongoose = require('mongoose');

module.exports = mongoose.model('Request', {
    userName: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    
});