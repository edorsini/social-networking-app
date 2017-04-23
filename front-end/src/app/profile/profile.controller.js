export class ProfileController {

    constructor ($http, API_URL) {
        'ngInject';
        
        this.$http = $http;
        this.API_URL = API_URL;
        this.getMessages();
    }

    getMessages() {
        var vm  = this;
        this.$http.get(this.API_URL + 'api/wallPost').then(function(result){
            vm.messages = result.data;
        });
    }

    postMessage() {
        this.$http.post(this.API_URL + 'api/wallPost', {msg: this.message});
    }

}