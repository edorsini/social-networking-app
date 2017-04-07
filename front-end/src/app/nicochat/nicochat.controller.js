module.export Class NicoChatController {
    constructor ($http, $scope, socket) {
        'ngInject';
        
        this.$http = $http;
        this.$scope = $scope;
        
        $scope.messages = [];
        $scope.room = "";
        
    }
    
    
    
    //posts on server 
    //server generates several chat models and saves them to the database
    postInsertTestData() {
        this.$http.post('http://localhost:5000/setup', {msg: this.chatmessage});
    }
    
    initChat() {
        var vm = this;
        
        this.messages = [];
        this.room = "";
        
        socket.on('setup', function(data) {
            var rooms = data.rooms;
        });
        
        socket.emit('new user', function)
            
            
            
            /*
            //handle the creation of a room
            function handleRoomSubMenu(r) {
                var clickedRoom = rooms[r];
                
                //append each room to the menu
                roomsMenu.append(new GUI.MenuItem({
                    label: clickedRoom.toUpperCase(),
                    click: function() {
                        //what happens on clicking the rooms? Switch room.
                        $scope.room = clickedRoom.toUpperCase();
                        //Notify the server that the user changed his/her rooom
                        socket.emit('switch room', {
                            newRoom: clickedRoom,
                            username: $scope.username
                            
                        });
                        //Fetch the new rooms messages
                        $http.get(serverBaseUrl + '/msg?room=' + clickedRoom)
                            $scope.messages = msgs;
                        });
                    }
                ));
            }
            //Attach menu
            //need to add something here
            vm.rooms = windowMenu;
            
        });*/
    
            socket.on('message created', function(data) {
                //Push to new message to our $scope.messages
                $scope.messages.push(data);
                //Empty the textarea
                $scope.messages = "";
            });
            //send a new message
            $scope.send = function (msg) {
                //Notify the server that there is a new maesage with the message as a packet
                socket.emit('new message', {
                    room: $scope.room,
                    message: msg,
                    username: $scope.username
                });
                
            };
            
        }
    
    
        
    
    
}