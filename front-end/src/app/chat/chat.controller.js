export class ChatController {
  constructor ($http) {
    'ngInject';

      this.$http = $http;
      this.getChatMessages();
    }

    getChatMessages() {
        var vm  = this;
        this.$http.get('http://localhost:5000/api/chat').then(function(result) {
            vm.chatmessages = result.data;
        });
    }

    postChatMessage() {
        this.$http.post('http://localhost:5000/api/chat', {msg: this.chatmessage});
    }
    
        
}

