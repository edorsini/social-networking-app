export class AuthController {

    constructor($auth, $state){
        'ngInject';

        this.$auth = $auth;
        this.$auth.logout();
        this.$state = $state;
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
            vm.$state.go('home')
        });
    }

}
