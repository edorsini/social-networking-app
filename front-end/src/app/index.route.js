export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('auth', {
      url: '/auth',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('chat', {
      url:'/chat',
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController',
      controllerAs: 'chat'
  })
  
    .state('profile', {
      url:'/profile',
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile'
  });
    

  $urlRouterProvider.otherwise('/');
}
