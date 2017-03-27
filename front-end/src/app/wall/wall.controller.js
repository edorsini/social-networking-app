export class WallController {

    constructor($http) {
        'ngInject';

        this.$http = $http;
        this.getPosts();
    }

    getPosts() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/wall').then(function(result) {
            vm.posts = result.data;

        });
    }

    makePost() {
        var date = new Date().toLocaleString();
        //console.log(date);
        this.$http.post('http://localhost:5000/api/wall', { postMsg: this.post.msg });
        this.post = "";
        this.getPosts();
    }

    postComment(post, comment) {

        post.comments.push(comment);
        //console.log(post);
        var date = new Date().toLocaleString();
        //console.log(date);

        this.$http.post('http://localhost:5000/api/wall', { commentMsg: comment, dateAndTime: date, postId: post._id });
    }
}
