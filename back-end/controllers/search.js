var Profile = require('../models/profile');

module.exports = {
  get: function(req, res) {

    if( req.params.searchTerm == new String("username").valueOf() )
    {
        Profile.find({username: { $regex: req.params.searchString, $options: "i" }}).exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("firstname").valueOf() )
    {
          Profile.find({firstname: { $regex: req.params.searchString, $options: "i" }}).exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("lastname").valueOf() )
    {
        Profile.find({lastname: { $regex: req.params.searchString, $options: "i" }}).exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("gender").valueOf() )
    {
        Profile.find({gender: { $regex: req.params.searchString, $options: "i" }}).exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("birthdate").valueOf() )
    {
        Profile.find({birthdate: { $regex: req.params.searchString, $options: "i" }}).exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("country").valueOf() )
    {
        Profile.find({country: { $regex: req.params.searchString, $options: "i" }}).exec(function(err,result){res.send(result);});
    }
  }
};
