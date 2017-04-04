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
        this.getFriends();
    }

    /**
     * Gets all friends for a particular user.
     */
    getFriends() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/friends').then(function(result) {
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
    removeFriend(friend) {
        var vm = this;
        this.$http.post('http://localhost:5000/api/friends/remove/' + friend).then(function() { vm.getFriends(); });
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
