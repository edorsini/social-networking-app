export class OptionsController {

    constructor($http){
        'ngInject';

        this.$http = $http;
        this.getProfile();
    }

    getProfile() {
      var vm = this;
      this.$http.get('http://localhost:5000/api/profile').then(function(result){
        vm.profile = result.data;
      });
    }

    saveProfile() {
      this.$http.post('http://localhost:5000/api/profile', {
        profile: this.firstname
        });
    }
}

