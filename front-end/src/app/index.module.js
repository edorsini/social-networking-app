/* global malarkey:false, moment:false */
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { ChatController } from './chat/chat.controller';
import { ProfileController } from './profile/profile.controller';
import { AuthController } from './auth/auth.controller';
import { NavbarController } from './components/navbar/navbar.controller';
import { CompareToDirective } from './directives/compareTo.directive';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('friendzone', [
    'ui.router', 
    'ui.bootstrap', 
    'toastr', 
    'satellizer',
    'btford.socket-io'
    
])
  .constant('API_URL', 'http://localhost:5000/')
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  /*.controller('NicoChatController', [$scope, 'socketio', function($scope, socketio){
      'use strict';
      
      $scope.chatmessages = chatmessages.query();
      
      socketio.on('news', function(msg) {
         $scope.tickets.push(msg);
      });
  }])*/
  .controller('ProfileController', ProfileController)
  .controller('MainController', MainController)
  .controller('AuthController', AuthController)
  .controller('ChatController', ChatController)
  .controller('NavbarController', NavbarController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective)
  .directive('compareTo', CompareToDirective)
 
.factory('nicosocket', function () {
    
    var nicosocket = io.connect('http://localhost:5000/');
    
    return {
        on: function (eventName, callback) {
            nicosocket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            nicosocket.emit(eventName, data);
        }
    };
});
/*}])
  .factory('socketclient', function() {
    var io = require('../bower_components/socket.io-client/dist/socket.io.js');
    return io;
    })
  .factory('planchsocket', function (socketFactory) {
    //var io = $http.get('//cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js');
    //var io = recq'../bower_components/socket.io-client/socket.io.js';
    //var io  = socketclient; 
    var myIoSocket = io.connect();

    var mySocket = socketFactory({
        ioSocket: myIoSocket
    });

  return mySocket;
});
/*.factory('socket', ['$rootScope', function ($rootScope) {
    //'use strict';
    var socket = io.connect();
    //var socket = io.connect();
    
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}])*/
