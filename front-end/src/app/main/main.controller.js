export class MainController {
  constructor ($http) {
    'ngInject';

      this.$http = $http;
      this.getMessages();
      this.getChatMessages();
    }

    getMessages() {
        var vm  = this;
        this.$http.get('http://localhost:5000/api/message').then(function(result){
            vm.messages = result.data;
        });
    }

    postMessage() {
        this.$http.post('http://localhost:5000/api/message', {msg: this.message});
    }
    
    
    getChatMessages() {
        var vm  = this;
        this.$http.get('http://localhost:5000/api/chat').then(function(result){
            vm.chatmessages = result.data;
        });
    }

    postChatMessage() {
        this.$http.post('http://localhost:5000/api/chat', {msg: this.chatmessage});
    }
    

}
