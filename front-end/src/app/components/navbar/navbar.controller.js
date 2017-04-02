export class NavbarController {
    constructor(authUser) {
        'ngInject';
        
        this.authUser = authUser;
    }
    
    isAuthenticated() {
        return this.authUser.isAuthenticated();
    }
    
    getUserId() {
        return this.authUser.getUserId();
    }
}
