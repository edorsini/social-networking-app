export class PictureController {
    constructor($http) {
        'ngInject';

        this.$http = $http;
        this.getMessages();
    }

    getMessages() {
        var vm = this;
        alert("gets all my pictures");
        this.$http.get('http://localhost:5000/api/message').then(function(result) {
            vm.messages = result.data;
        });
    }

    postMessage() {
        alert("saves a picture");
        //this.$http.post('http://localhost:5000/api/message', { msg: this.message });
    }



}
