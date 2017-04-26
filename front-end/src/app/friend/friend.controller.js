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
        console.log("hey");
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
    * Accept friend request
    */
    acceptFriendRequest(friendReq) {
        console.log(friendReq);
        var vm = this;
        this.$http.post('http://localhost:5000/api/friends/', { friendRequest: friendReq }).then(function(){
            vm.getFriends();
            console.log(friendReq);
            vm.removeRequest(friendReq);
        });
    }

    /**
     * Removes a friend from a particular user.
     */
    removeFriend(friend) {
        var vm = this;
        console.log("here is the user id: "+friend);
        this.$http.post('http://localhost:5000/api/friends/remove/' + friend).then(function() { vm.getFriends(); });
    }
    
    removeRequest(friendReq){
        console.log("here in front end remove");
        var vm = this;
        this.$http.post('http://localhost:5000/api/removerequest',{id:friendReq._id}).then(function(){vm.getAllFriendRequests();});
    }
}
