var mongoose = require('mongoose');

module.exports = mongoose.model('Picture', {
    title: String,
    originalname: String,
    filename: String,
    path: String,
    destination: String,
    size: String,
    mimetype: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});
