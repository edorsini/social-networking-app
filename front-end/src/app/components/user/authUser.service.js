export class AuthUserService {
    constructor($auth) {
        'ngInject';
        
        this.$auth = $auth;
    }
    
    isAuthenticated() {
        return this.$auth.isAuthenticated();
    }
    
    getUserId() {
        return this.isAuthenticated() ? this.$auth.getPayload().sub : undefined;
    }
}