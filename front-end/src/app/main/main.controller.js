export class MainController {
    constructor($http, $API_URL) {
        'ngInject';

        this.$http = $http;
        this.getMessages();
        this.getChatMessages();
    }

    getMessages() {
        var vm = this;
        this.$http.get(API_URL + 'api/message').then(function(result) {
            vm.messages = result.data;
        });
    }

    postMessage() {
        alert("gets to main.postMessage()");
        this.$http.post(API_URL + 'api/message', { msg: this.message });
    }
    
    
    getChatMessages() {
        var vm  = this;
        this.$http.get(API_URL + 'api/chat').then(function(result){
            vm.chatmessages = result.data;
        });
    }

    postChatMessage() {
        this.$http.post(API_URL + 'api/chat', {msg: this.chatmessage});
    }
    

}
