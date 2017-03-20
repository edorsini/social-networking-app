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
        this.getAllFriends('edorsini');
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

    testing() {
        var vm = this;
        alert("gets here");
        this.$http.get('http://localhost:5000/testing/').then(function(result) {
            vm.files = result.data;
        });
    }


}
