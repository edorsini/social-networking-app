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
            console.log('getposts ',vm.posts);
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
        var vm = this;
        console.log("post: " + post);
        console.log("post id: " + post._id);
        console.log("comment: " + comment);
        this.$http.post(this.API_URL + 'api/comment/' + this.userId, {postId:post._id,msg:comment}).then(function() {
			vm.getPosts();
		});
    }
}
