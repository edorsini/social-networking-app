
export class SearchController {

    constructor ($http) {
      'ngInject';

      this.$http = $http;
      this.findResults();
    }

    findResults() {
        var vm  = this;
        this.$http.get('http://localhost:5000/api/search/' + searchTerm.value + '/' + searchStr.value).then(function(result){
            vm.profile = result.data;
        });
    }
}
