export class OptionsController {

    constructor($http, $stateParams){
        'ngInject';

        this.$http = $http;
        this.userId = $stateParams.userId;
        this.getProfile();
    }

    getProfile() {
      var vm = this;
      this.$http.get('http://localhost:5000/api/profile/' + this.userId).then(
          function(result){
              vm.profile = result.data;
          });
    }

    saveProfile() {
      this.$http.post('http://localhost:5000/api/profile', this.profile);
    }
}

