describe('controller main', () => {
    let $controller, $state, authUser;
    
    beforeEach(angular.mock.module('friendZone'));
    
    beforeEach(inject((_$controller_, _$state_, _authUser_) => {
        $controller = _$controller_;
        $state = _$state_;
        authUser = _authUser_;
    }));
    
    describe('what it does on page load', () => {
        it('shows the user their profile if logged in', () => {
            spyOn(authUser, 'isAuthenticated').and.returnValue(true);
            spyOn(authUser, 'getUserId').and.returnValue('user123');
            spyOn($state, 'go');
            
            $controller('MainController', {
                $state: $state,
                authUser: authUser
            });
            
            expect($state.go).toHaveBeenCalledWith('profile', { userId: 'user123'});
        });
        
        it('shows the user the login page if not logged in', () => {
            spyOn(authUser, 'isAuthenticated').and.returnValue(false);
            spyOn($state, 'go');
            
            $controller('MainController', {
                $state: $state,
                authUser: authUser
            });
            
            expect($state.go).toHaveBeenCalledWith('auth');
        });
    });
});