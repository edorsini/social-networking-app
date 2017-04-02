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

    getProfile2() {
      console.log("In getProfile2(), userId = " + user.value);
      var vm = this;
      this.$http.get('http://localhost:5000/api/profile/' + user.value).then(
        function(result){
          vm.profile = result.data;
        });
    }

    saveProfile() {
      console.log("In saveProfile()");

      this.$http.post('http://localhost:5000/api/profile', this.profile);
    }
}

