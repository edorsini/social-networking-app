var mongoose = require('mongoose');

module.exports = mongoose.model('ChatMessage', {
    
    msg: String,
    
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
    
});
