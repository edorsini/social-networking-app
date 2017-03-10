export class ChatController {
  constructor ($http, nicosocket, $scope) {
    'ngInject';

      //this.nicosocket = nicosocket;
      
      this.$http = $http;
      this.getChatMessages();
      
      $scope.newCustomers = [];
      $scope.currentCustomer = {};
      $scope.join = function() {
        nicosocket.emit('add-customer',             $scope.currentCustomer);
        };

    nicosocket.on('notification', function(data) {
        $scope.$apply(function () {
          $scope.newCustomers.push(data.customer);
        });
      });
    
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
    /*
    join() {
        
        
        this.nicosocket.emit('add-customer', {message: vm.currentCustomer});
    }
    
    nicoIsOn() {
    
        this.nicosocket.on('notification', function(data) {
        var vm = this;
        vm.newCustomers.push(data.customer);
        
    }
    */


/*
        this.nicosocket.on('notification', function(data) {
            vm.$scope.$apply(function () {
                $scope.newCustomers.push(data.customer);
            });
        });  
        */    
/*
    getNicoMessages() {
        var vm = this;
        this.mySocket.on('nicotestchatmessage', function(result) {
            //console.log("Rendering Nico's Chat Messages sir...");
            
            vm.nicotestmessages = result;
        });
        
    }
*/
        


