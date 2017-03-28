export class WallController {

    constructor($http, $stateParams) {
        'ngInject';

        this.$http = $http;
        this.userId = $stateParams.userId;
        this.getPosts();
    }

    getPosts() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/wall/' + this.userId).then(function(result) {
            vm.posts = result.data;
        });
    }

    makePost() {
        var vm = this;
        this.$http.post('http://localhost:5000/api/wall/' + this.userId, { postMsg: this.post.msg }).then(function() {
            vm.post.msg = '';
            vm.getPosts();
        });
    }

    postComment(post, comment) {

        post.comments.push(comment);
        //console.log(post);
        var date = new Date().toLocaleString();
        //console.log(date);

        this.$http.post('http://localhost:5000/api/wall/' + this.userId, { commentMsg: comment, dateAndTime: date, postId: post._id });
    }
}
