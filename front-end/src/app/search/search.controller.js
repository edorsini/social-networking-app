
export class SearchController {

    constructor ($http, API_URL) {
      'ngInject';

      this.$http = $http;
      this.findResults();
    }

    findResults() {
        var vm  = this;
        this.$http.get(this.API_URL + 'api/search/' + searchTerm.value + '/' + searchStr.value).then(function(result){
            vm.profile = result.data;
        });
    }
}
