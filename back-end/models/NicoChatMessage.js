var mongoose = require('mongoose');

module.exports = mongoose.model('NicoChatMessage', {
  created: Date,
  msg: String,
  room: String,
  chatname: String,
  profile: {type: mongoose.Schema.ObjectId, ref: 'Profile'}
  
});

