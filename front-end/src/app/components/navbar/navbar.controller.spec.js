describe('controller navbar', () => {
    let vm, $auth;
    
    beforeEach(angular.mock.module('friendZone'));
    
    beforeEach(inject(($controller, _$auth_) => {
        $auth = _$auth_;
        
        vm = $controller('NavbarController', {
            $auth: $auth
        });
    }));
    
    describe('what it does on page load', () => {
        it('sets adds $auth.isAuthenticated as a method', () => {
            expect(vm.isAuthenticated).toEqual($auth.isAuthenticated);
        });
    });
    
    describe('getUserId', () => {
        it('returns the payload sub if user is authenticated', () => {
            spyOn($auth, 'isAuthenticated').and.returnValue(true);
            spyOn($auth, 'getPayload').and.returnValue({sub: 'user-id-123'});

            let userId = vm.getUserId();

            expect(userId).toEqual('user-id-123');
        });

        it('returns undefined if the user is not authenticated', () => {
            spyOn($auth, 'isAuthenticated').and.returnValue(false);

            let userId = vm.getUserId();

            expect(userId).toBeUndefined();
        });
    });
});