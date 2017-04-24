export class WallController {

    constructor($http, $stateParams, API_URL) {
        'ngInject';

        this.$http = $http;
        this.API_URL = API_URL;
        this.userId = $stateParams.userId;
        this.getPosts();
    }

    getPosts() {
        var vm = this;
        this.$http.get(this.API_URL + 'api/wall/' + this.userId).then(function(result) {
            vm.posts = result.data;
        });
    }

    makePost() {
        var vm = this;
        this.$http.post(this.API_URL + 'api/wall/' + this.userId, { postMsg: this.post.msg }).then(function() {
            vm.post.msg = '';
            vm.getPosts();
        });
    }

    postComment(post, comment) {

        post.comments.push(comment);
        //console.log(post);
        var date = new Date().toLocaleString();
        //console.log(date);

        this.$http.post(this.API_URL + 'api/wall/' + this.userId, { commentMsg: comment, dateAndTime: date, postId: post._id });
    }
}
