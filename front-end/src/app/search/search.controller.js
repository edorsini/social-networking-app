
export class SearchController {

    constructor ($http, API_URL) {
      'ngInject';

      this.$http = $http;
      this.API_URL = API_URL;
      this.searchTerm = "username";
    }

    findResults() {
        var vm  = this;
        this.$http.get(this.API_URL + 'api/search/' + this.searchTerm + '/' + this.searchStr).then(function(result){
            vm.results = result.data;
        });
    }
}
