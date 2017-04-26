/**
 * Front-end controller for the friends feature.
 */

export class FriendController {

    /**
     * Constructor for this controller.  Gets all the friends for a particular user.
     */
    constructor($http, API_URL) {
        'ngInject';

        this.$http = $http;
        this.API_URL = API_URL;
        this.getAllFriendRequests();
        this.getFriends();
    }

    /**
     * Gets all friends for a particular user.
     */
    getFriends() {
        var vm = this;
        this.$http.get(this.API_URL + 'api/friends').then(function(result) {
            vm.data = result.data;
        });
    }

    /**
     * Get friend requests for users
     */
    getAllFriendRequests() {
        var vm = this;
        this.$http.get(this.API_URL + 'api/friendrequest').then(function(result) {
            vm.requests = result.data;
        });
    }
    /**
    * Accept friend request
    */
    acceptFriendRequest(friendReq) {
        var vm = this;
        this.$http.post(this.API_URL + 'api/friends/', { friendRequest: friendReq }).then(function(){
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
        this.$http.post(this.API_URL + 'api/friends/remove/' + friend).then(function() { vm.getFriends(); });
    }
    
    removeRequest(friendReq){
        var vm = this;
        this.$http.post(this.API_URL + 'api/removerequest',{id:friendReq._id}).then(function(){vm.getAllFriendRequests();});
    }
}
