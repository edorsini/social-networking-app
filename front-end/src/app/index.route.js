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
        .state('friend', {
            url: '/friend',
            templateUrl: 'app/friend/friend.html',
            controller: 'FriendController',
            controllerAs: 'friend'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: 'app/chat/chat.html',
            controller: 'ChatController',
            controllerAs: 'chat'
        })
        .state('profile', {
            url: '/profile/:userId',
            views: {
                '': { templateUrl: 'app/profile/profile.html' },
                'options@profile': {
                    templateUrl: 'app/options/options.html',
                    controller: 'OptionsController',
                    controllerAs: 'options'
                },
                'wall@profile': {
                    templateUrl: 'app/wall/wall.html',
                    controller: 'WallController',
                    controllerAs: 'wall'
                }
            }


        });



    $urlRouterProvider.otherwise('/');
}
