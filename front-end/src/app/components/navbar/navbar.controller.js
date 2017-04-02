export class NavbarController {
    constructor($auth) {
        'ngInject';

        this.$auth = $auth;
        this.isAuthenticated = $auth.isAuthenticated;
    }
    
    getUserId() {
        return this.$auth.isAuthenticated() ? this.$auth.getPayload().sub : undefined;
    }
}
