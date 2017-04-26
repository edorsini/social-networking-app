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
        this.requestExists();
    }

    getProfile() {
        var vm = this;
        this.$http.get(this.API_URL + 'api/profile/' + this.userId).then(
            function(result) {
                vm.profile = result.data;
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
        this.$http.post(this.API_URL + 'api/friendrequest/' + this.userId);
    }
    
    requestExists(){
        var vm = this;
        this.$http.get(this.API_URL + 'api/checkrequest/' + this.userId).then(
            function(result){
                vm.exists = result.data;
        });
    }
}
