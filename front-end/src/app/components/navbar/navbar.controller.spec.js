describe('controller navbar', () => {
    let vm, authUser;
    
    beforeEach(angular.mock.module('friendZone'));
    
    beforeEach(inject(($controller, _authUser_) => {
        authUser = _authUser_;
        
        vm = $controller('NavbarController', {
            authUser: authUser
        });
    }));
    
    describe('isAuthenticated', () => {
        it('uses authUser service to check if user is authenticated', () => {
            spyOn(authUser, 'isAuthenticated').and.returnValue(true);
            
            let isAuthenticated = vm.isAuthenticated();
            
            expect(isAuthenticated).toEqual(true);
        });
    });
    
    describe('getUserId', () => {
        it('uses authUser service to get the user id', () => {
            spyOn(authUser, 'getUserId').and.returnValue('user-id-123');

            let userId = vm.getUserId();

            expect(userId).toEqual('user-id-123');
        });
    });
});