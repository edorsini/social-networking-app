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
    .state('options', {
      url: '/options',
      templateUrl: 'app/options/options.html',
      controller: 'OptionsController',
      controllerAs: 'options'
    });

  $urlRouterProvider.otherwise('/');
}
