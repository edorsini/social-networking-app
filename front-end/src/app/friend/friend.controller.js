/**
 * Front-end controller for the friends feature.
 */

export class FriendController {

    /**
     * Constructor for this controller.  Gets all the friends for a particular user.
     */
    constructor($http) {
        'ngInject';

        this.$http = $http;
        this.getAllFriendRequests();
        // TODO: need to dynamically pass in a username; Currently, it is hardcoded for development purposes.
        this.getFriends('rob');
    }

    /**
     * Gets all friends for a particular user.
     */
    getFriends(username) {
        var vm = this;
        this.$http.get('http://localhost:5000/api/friends/' + username).then(function(result) {
            vm.data = result.data;
        });
    }

    /**
     * Get friend requests for users
     */
    getAllFriendRequests() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/friendrequest').then(function(result) {
            vm.requests = result.data;
        });
    }

    /**
     * Send new friend request to this user
     */
    sendFriendRequest() {
        var username = "rob";
        this.$http.post('http://localhost:5000/api/friendrequest/' + username);
        this.getAllFriendRequests();
    }

    acceptFriendRequest() {
        var username = "rob";
        this.$http.post('http://localhost:5000/api/friends/', { userName: username });
    }

    /**
     * Removes a friend from a particular user.
     */
    removeFriend(username, friend) {
        console.log("removes a friend [" + friend + "] from user [" + username + "]");
        this.$http.post('http://localhost:5000/api/friends/remove/' + username + '/' + friend);
    }

    /*
        acceptFriend(username, friend) {
            // TODO
        }

        getPendingFriends(username) {
            // TODO
        }

        requestFriend(username, friend) {
            // TODO
        }
    */

}
