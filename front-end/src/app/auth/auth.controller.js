export class AuthController {

    constructor($auth){
        'ngInject';

        this.$auth = $auth;
    }

    register() {
        var vm = this;
        this.$auth.signup(this.user).then(function(token) {
            vm.$auth.setToken(token);
        });
    }

    login() {
        var vm = this;
        this.$auth.login(this.login.user).then(function(token) {
            vm.$auth.setToken(token);
        });
    }
    
    authenticate(provider) {
        var vm = this;
        this.$auth.authenticate(provider).then(function(token) {
            vm.$auth.setToken(token);
        });
    }

}
