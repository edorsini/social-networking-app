/**
 * Front-end controller for the friends feature.
 */

export class FriendController {

    /**
     * For development purposes only.
     */
    testing() {
        var vm = this;
        alert("gets here");
        this.$http.get('http://localhost:5000/testing/').then(function(result) {
            vm.files = result.data;
        });
    }

    /**
     * Constructor for this controller.  Gets all the friends for a particular user.
     */
    constructor($http) {
        'ngInject';

        this.$http = $http;
        // TODO: need to dynamically pass in a username; Currently, it is hardcoded for development purposes.
        this.getFriends('edorsini');
    }

    /**
     * Gets all friends for a particular user.
     */
    getFriends(username) {
        var vm = this;
        console.log("gets all my friends");
        this.$http.get('http://localhost:5000/friends/' + username).then(function(result) {
            vm.data = result.data;
        });
    }

    removeFriend(username, friend) {
        // TODO
    }

    acceptFriend(username, friend) {
        // TODO
    }

    getPendingFriends(username) {
        // TODO
    }

    requestFriend(username, friend) {
        // TODO
    }

}
