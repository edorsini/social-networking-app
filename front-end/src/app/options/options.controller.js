export class OptionsController {

    constructor($http, $stateParams, authUser){
        'ngInject';

        this.$http = $http;
        this.userId = $stateParams.userId;
        this.editing = false;
        this.ownProfile = this.userId == authUser.getUserId();
        this.getProfile();
    }

    getProfile() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/profile/' + this.userId).then(
            function(result){
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
        this.$http.post('http://localhost:5000/api/profile', this.profileEdit).then(
            function() {
                vm.profile = vm.profileEdit;
                vm.saving = false;
                vm.editing = false;
            });
    }
}

