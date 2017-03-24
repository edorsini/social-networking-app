var mongoose = require('mongoose');

module.exports = mongoose.model('Request', {
    reqUser: {type: mongoose.Schema.ObjectId, ref: 'User'},
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    
});