var Profile = require('../models/profile');

module.exports = {
  get: function(req, res) {
    if( req.params.searchTerm == new String("username").valueOf() )
    {
	Profile.find({username: req.params.searchString}).populate('user', '-pwd').exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("firstname").valueOf() )
    {
        Profile.find({firstname: req.params.searchString}).populate('user', '-pwd').exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("lastname").valueOf() )
    {
        Profile.find({lastname: req.params.searchString}).populate('user', '-pwd').exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("gender").valueOf() )
    {
        Profile.find({gender: req.params.searchString}).populate('user', '-pwd').exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("birthdate").valueOf() )
    {
        Profile.find({birthdate: req.params.searchString}).populate('user', '-pwd').exec(function(err,result){res.send(result);});
    }
    else if( req.params.searchTerm == new String("country").valueOf() )
    {
        Profile.find({country: req.params.searchString}).populate('user', '-pwd').exec(function(err,result){res.send(result);});
    }
}
};
