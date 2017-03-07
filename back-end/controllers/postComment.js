var PostComment = require('../models/comment');

module.exports = {
    get: function (req, res) {
        PostComment.find({}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
            });
    },
    post: function(req, res) {
        console.log(req.body, req.user);
        var post = WallPost.find({});
        var comment = new Comment();
        comment.commentMsg = req.body.message;
        comment.dateAndTime = req.body.date;
        comment.user =  req.user;
        post.comments.push(comment);
        post.save();
        res.status(200);

    }
};