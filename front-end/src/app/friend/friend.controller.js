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
        this.getAllFriendRequests();
        // TODO: need to dynamically pass in a username; Currently, it is hardcoded for development purposes.
        this.getFriends('rob');
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
    
    /**
    * Get friend requests for users
    */
    getAllFriendRequests(){
        var vm  = this; this.$http.get('http://localhost:5000/api/friendrequest').then(function(result){
            vm.requests = result.data;
            console.log(vm.requests);
        });
    }
    
    /**
    * Send new friend request to this user
    */
    sendFriendRequest(){
        var vm = this;
        var username = "rob";
        this.$http.post('http://localhost:5000/api/friendrequest/' + username);
        this.getAllFriendRequests();
    }
    
    acceptFriendRequest(){
        var vm = this;
        var username = "rob";
        this.$http.post('http://localhost:5000/api/friends/', {userName:username});
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



