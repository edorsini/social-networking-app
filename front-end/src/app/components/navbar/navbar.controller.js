export class NavbarController {
    constructor($auth) {
        'ngInject';

        this.isAuthenticated = $auth.isAuthenticated;
    }
}
