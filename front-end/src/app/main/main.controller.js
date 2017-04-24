export class MainController {
<<<<<<< HEAD
    constructor($http, $API_URL) {
=======
    constructor($http, API_URL) {
>>>>>>> 7a819b6d218258b507697f0889209e039852fc86
        'ngInject';

        this.$http = $http;
        this.API_URL = API_URL;
        this.getMessages();
        this.getChatMessages();
    }

    getMessages() {
        var vm = this;
<<<<<<< HEAD
        this.$http.get(API_URL + 'api/message').then(function(result) {
=======
        this.$http.get(this.API_URL + 'api/message').then(function(result) {
>>>>>>> 7a819b6d218258b507697f0889209e039852fc86
            vm.messages = result.data;
        });
    }

    postMessage() {
        alert("gets to main.postMessage()");
<<<<<<< HEAD
        this.$http.post(API_URL + 'api/message', { msg: this.message });
=======
        this.$http.post(this.API_URL + 'api/message', { msg: this.message });
>>>>>>> 7a819b6d218258b507697f0889209e039852fc86
    }
    
    
    getChatMessages() {
        var vm  = this;
<<<<<<< HEAD
        this.$http.get(API_URL + 'api/chat').then(function(result){
=======
        this.$http.get(this.API_URL + 'api/chat').then(function(result){
>>>>>>> 7a819b6d218258b507697f0889209e039852fc86
            vm.chatmessages = result.data;
        });
    }

    postChatMessage() {
<<<<<<< HEAD
        this.$http.post(API_URL + 'api/chat', {msg: this.chatmessage});
=======
        this.$http.post(this.API_URL + 'api/chat', {msg: this.chatmessage});
>>>>>>> 7a819b6d218258b507697f0889209e039852fc86
    }
    

}
