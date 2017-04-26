export class MainController {

    constructor($state, authUser) {

        'ngInject';

        if (authUser.isAuthenticated()) {
            $state.go('profile', { userId: authUser.getUserId() });
        } else {
            $state.go('auth');
        }
    }
}
