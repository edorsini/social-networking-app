describe('controller auth', () => {
    let vm, $controller, $scope, $auth, $q;
    
    beforeEach(angular.mock.module('friendZone'));
    
    beforeEach(inject((_$controller_, $rootScope, _$auth_, _$q_) => {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $auth = _$auth_;
        $q = _$q_;
        
        vm = $controller('AuthController', {
            $auth: $auth
        });
    }));
    
    describe('what it does on page load', () => {
        it('logs out the current session', () => {
            spyOn($auth, 'logout');
            
            $controller('AuthController', {
                $auth: $auth
            });
            
            expect($auth.logout).toHaveBeenCalled();
        });
    })
    
    describe('register', () => {
        it('should sign up the user and set the token', () => {
            let signupDeferred = $q.defer();
            spyOn($auth, 'signup').and.returnValue(signupDeferred.promise);
            
            let user = { someUserKey: 'someUserValue' }
            vm.user = user;
            
            vm.register();
            
            expect($auth.signup).toHaveBeenCalledWith(user);
            
            spyOn($auth, 'setToken');

            let token = 'hereIsTheToken';
            signupDeferred.resolve(token);
            
            $scope.$apply();
            
            expect($auth.setToken).toHaveBeenCalledWith(token);
        });
    });
    
    describe('login', () => {
        it('should log in the user and set the token', () => {
            let loginDeferred = $q.defer();
            spyOn($auth, 'login').and.returnValue(loginDeferred.promise);
            
            let user = { someUserKey: 'someUserValue' }
            vm.login.user = user;
            
            vm.login();
            
            expect($auth.login).toHaveBeenCalledWith(user);
            
            spyOn($auth, 'setToken');

            let token = 'hereIsTheToken';
            loginDeferred.resolve(token);
            
            $scope.$apply();
            
            expect($auth.setToken).toHaveBeenCalledWith(token);
        });
    });
    
    describe('authenticate', () => {
        it('should authenticate the user and set the token', () => {
            let authenticateDeferred = $q.defer();
            spyOn($auth, 'authenticate').and.returnValue(authenticateDeferred.promise);
            
            let provider = 'myProvider';
            
            vm.authenticate(provider);
            
            expect($auth.authenticate).toHaveBeenCalledWith(provider);
            
            spyOn($auth, 'setToken');

            let token = 'hereIsTheToken';
            authenticateDeferred.resolve(token);
            
            $scope.$apply();
            
            expect($auth.setToken).toHaveBeenCalledWith(token);
        });
    });
});


// Here is a description of what's going on with this test
    
// 'describe' is like creating a category of tests
describe('controller auth', () => {
    let vm, $scope, $auth, $q;

    // beforeEach: runs before each test
    // here we initialize the angular app module (defined in index.module.js file)
    beforeEach(angular.mock.module('friendZone'));

    // inject: angular will provide the services that it normally passes to the angular modules
    // we can use _<service>_ to get a reference to that service - it's not required, but is convenient for naming variables
    beforeEach(inject(($controller, $rootScope, _$auth_, _$q_) => {

        // angular controllers work by adding variables to the scope. The way we're using angular, we're not explicitly
        // using the scope, but we'll need it for the tests
        $scope = $rootScope.$new();

        // $auth is a satellizer service that gets injected in our auth controller
        $auth = _$auth_;

        // $q is a service that lets us work with promise objects
        $q = _$q_;

        // the $controller service lets us instantiate a controller object, and we can specify the services to inject
        vm = $controller('AuthController', {
            $auth: $auth
        });
    }));

    // here we'll test the register function
    describe('register', () => {

        // 'it' defines an actual test case
        it('should sign up the user and set the token', () => {

            // In the auth controller, we make a method call like this:
            // this.$auth.signup(this.user).then(callbackFunc)
            // The $auth.signup method returns a promise object, and the call to callbackFunc is deferred until the
            // promise is "resolved". We use the $q service to generate a deferred object, and stub the $auth.signup
            // method to return a promise.
            let signupDeferred = $q.defer();
            spyOn($auth, 'signup').and.returnValue(signupDeferred.promise);

            // The $auth.signup method takes "this.user" as a parameter, so we'll add a fake user object to the class
            // We don't really care what's in the user object, we only care that it is passed as an argument to the
            // $auth.signup method.
            let user = { someUserKey: 'someUserValue' }
            vm.user = user;

            // Now let's call the register method being tested
            vm.register();

            // We are expecting that the $auth.signup method was called with the user object we added to the class
            expect($auth.signup).toHaveBeenCalledWith(user);

            // When then promise from $auth.signup is resolved, we expect the $auth.setToken method to be called.
            // We'll spy on that method so we can verify that it gets called.
            spyOn($auth, 'setToken');

            // We create a fake token value, and resolve our promise using the deferred object, passing the token
            // as the parameter. This value we resolve the promise with gets passed to the callback function.
            let token = 'hereIsTheToken';
            signupDeferred.resolve(token);

            // Here is where we need to use the $scope. Angular won't actually act on the resolved promises until
            // we call the $scope.$apply() method.
            $scope.$apply();

            // Finally, we should expect that the $auth.setToken method was called with our token
            expect($auth.setToken).toHaveBeenCalledWith(token);
        });
    });
});