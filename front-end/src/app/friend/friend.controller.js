/**
 * Front-end controller for the profile picture.
 */

export class FriendController {
    /**
     * Constructor for this controller.  Gets all the profile images.
     */
    constructor($http) {
        'ngInject';

        this.$http = $http;
        this.getAllFriends('rob');
        this.getAllFriendRequests();
    }

    /**
     * Gets all profile image files.
     */
    getAllFriends(userName) {
        var vm = this;
        console.log("gets all my friends");
        this.$http.get('http://localhost:5000/friends/' + userName).then(function(result) {
            vm.friends = result.data;
        });
    }
    
    getAllFriendRequests(){
        var vm  = this; this.$http.get('http://localhost:5000/api/friendrequest').then(function(result){
            vm.requests = result.data;
            console.log(vm.requests);
        });
    }
    
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

    testing() {
        var vm = this;
        alert("gets here");
        this.$http.get('http://localhost:5000/testing/').then(function(result) {
            vm.files = result.data;
        });
    }


}



