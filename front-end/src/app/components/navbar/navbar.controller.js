export class NavbarController {
    constructor($auth) {
        'ngInject';

        this.$auth = $auth;
        this.isAuthenticated = $auth.isAuthenticated;
    }
    
    getUserId() {
        return this.isAuthenticated() ? this.$auth.getPayload().sub : undefined;
    }
}
