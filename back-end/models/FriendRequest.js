var mongoose = require('mongoose');

module.exports = mongoose.model('Request', {
    requester: {type: mongoose.Schema.ObjectId, ref: 'Profile'},
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    
});