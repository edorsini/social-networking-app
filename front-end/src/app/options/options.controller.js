export class OptionsController {

    constructor($http, $stateParams, authUser, API_URL) {
        'ngInject';

        this.$http = $http;
        this.API_URL = API_URL;
        this.userId = $stateParams.userId;
        this.editing = false;
        this.exists = false;
        this.ownProfile = this.userId == authUser.getUserId();
        this.getProfile();
    }

    getProfile() {
        var vm = this;
        var friendsPromise = this.$http.get(this.API_URL + 'api/friends');
        this.$http.get(this.API_URL + 'api/profile/' + this.userId)
        .then(function(result) {
            vm.profile = result.data;
            return friendsPromise;
                
        })
        .then(function (result) {
            var friends = result.data;
            for (let i = 0; i < friends.length; i++) {
                console.log(friends[i]._id, vm.profile._id);
                if (friends[i]._id == vm.profile._id) {
                    vm.isFriend = true;
                    break;
                }
            }
        });
    }

    editProfile() {
        this.profileEdit = angular.copy(this.profile);
        this.editing = true;
    }

    resetProfile() {
        this.editing = false;
    }


    saveProfile() {
        this.saving = true;
        var vm = this;
        this.$http.post(this.API_URL + 'api/profile', this.profileEdit).then(
            function() {
                vm.profile = vm.profileEdit;
                vm.saving = false;
                vm.editing = false;
            });
    }



    /**
     * Send new friend request to this user
     */
    sendFriendRequest() {
        var vm = this;
        vm.sendingFriendRequest = true;
        this.$http.post(this.API_URL + 'api/friendrequest/' + this.userId).finally(
            function() {
                vm.friendRequestSent = true;
                vm.sendingFriendRequest = false;
            });
    }
}
