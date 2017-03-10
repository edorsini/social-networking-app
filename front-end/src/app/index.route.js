export function routerConfig($stateProvider, $urlRouterProvider) {
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
        .state('picture', {
            url: '/picture',
            templateUrl: 'app/picture/picture.html',
            controller: 'PictureController',
            controllerAs: 'picture'
        })
        .state('chat', {
            url:'/chat',
            templateUrl: 'app/chat/chat.html',
            controller: 'ChatController',
            controllerAs: 'chat'
        })
       .state('wall', {
            url:'/wall',
            templateUrl: 'app/wall/wall.html',
            controller: 'WallController',
            controllerAs: 'wall'
        })
       .state('profile', {
            url:'/profile',
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
        })
       .state('options', {
            url: '/options',
            templateUrl: 'app/options/options.html',
            controller: 'OptionsController',
            controllerAs: 'options'
        });

 

    $urlRouterProvider.otherwise('/');
}
