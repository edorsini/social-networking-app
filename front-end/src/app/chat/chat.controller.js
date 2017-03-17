export class ChatController {
  constructor ($http, nicosocket, $scope, $timeout) {
    'ngInject';

      //this.nicosocket = nicosocket;
      this.nicosocket = nicosocket;
      this.$http = $http;
      //this.getChatMessages();
     // this.getChatMsgs();
      
      
      
      this.newNicoChatMessages = [];
      
      this.nicochatmessage = "";
      this.sendM = "";
      
      this.chatname = "nico";
      this.rooms = [];
      this.room ="";
      
      this.join($scope, $timeout);
      /*
      $scope.newCustomers = [];
      $scope.newChatMessages = [];
      $scope.room = "general";
      $scope.username = "nico";
      $scope.newRooms = {};
      $scope.currentCustomer = {};
      $scope.currentMessage = {};
      $scope.join = function() {
        nicosocket.emit('add-customer', $scope.currentCustomer);
        
      
        nicosocket.emit('add-chatmessage', {
            msg: $scope.currentMessage,
            user: $scope.username,
            room: $scope.room
            });
      
        $scope.currentCustomer = "";
      
      /*
        nicosocket.on('rooms', function(data) {
            $scope.$apply(function () {
                $scope.newRooms.push(data.room);
            });
        });

        nicosocket.on('chat-notification', function(data) {
            $scope.$apply(function () {
              $scope.newChatMessages.push(data);
            });
          });
    
        nicosocket.on('notification', function(data) {
            $scope.$apply(function () {
              $scope.newCustomers.push(data.customer);
            });
          });*/
    
  }
  
    getChatMessages() {
        var vm =this;
        
        this.$http.get('http://localhost:5000/api/chat').then(function(result) {
            vm.chatmessages = result.data;
        });
    }

    postChatMessage() {
        this.$http.post('http://localhost:5000/api/chat', {msg: this.chatmessage});
    }
    
    getChatMsgs() {
      var vm =this;  this.$http.get('http://localhost:5000/api/chat/msgs').then(function(result) {
            vm.newChatMessages = result.data;
        });
    }
    
    send() {
        
       var vm =this;
        vm.sendM = vm.nicochatmessage; 
        
        this.nicosocket.emit('new message', {
            room: vm.room,
            msg: vm.sendM,
            chatname: vm.chatname
        });
        
        vm.nicochatmessage = "";
        vm.sendM = "";
        
    }
    
    join($scope) {
        
        var vm=this;
        
        this.nicosocket.on('setup', function(data) {
            vm.rooms = data.rooms,
            vm.room = data.defaultRoom
        });
        
        
        this.nicosocket.emit('new-user', {
            room: vm.room
        });
        
        this.nicosocket.on('chat-notification', function(data) {
              //vm.newNicoChatMessages.push(data);
                //$scope.$digest();
                $scope.$apply(function() {
                    vm.newNicoChatMessages.push(data);
                });
            
                $timeout(function() {
                  var scroller = document.getElementById("autoscroll");
                  scroller.scrollTop = scroller.scrollHeight;
                }, 0, false);

          
            //old stuff that worked
            //vm.newNicoChatMessages.push(data);
            
          });
        /*
        this.nicosocket.on('chat-notification').function(result) {
            vm.newNicoChatMessages = result.data;
        }*/
              
            //vm.currentMessage = {};
        
        /*
        this.nicosocket.emit('new user',{
            chatname: this.chatname
        });
        /*
        this.nicosocket.emit('switch room',{
            newRoom: this.newRoom,
            chatname: this.chatname
        });
        /*
        this.nicosocket.emit('new message', {
            msg: this.msg,
            chatname: this.chatname,
            room: this.room
            });
        */
        /*
        this.nicosocket.on('message created', function(data) {
            //Push to new message to our scope.messages
            vm.clog = data.msg;
            
        });
        */
      
        
        /*
        this.nicosocket.on('chat-notification', function(data) {
            $scope.$apply(function () {
              $scope.newChatMessages.push(data);
            });
          });
        */
        
    
  }
}
  
/*};
    
    join() {
        var 
        
        
        
        this.nicosocket.emit('add-customer', {message: vm.currentCustomer});
    }
    
    nicoIsOn() {
    
        this.nicosocket.on('notification', function(data) {
        var vm = this;
        vm.newCustomers.push(data.customer);
        
    }
    


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
        


