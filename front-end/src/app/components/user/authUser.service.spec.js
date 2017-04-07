describe('service authUser', () => {
    let authUser, $auth;
    
    beforeEach(angular.mock.module('friendZone'));
    
    beforeEach(inject((_authUser_, _$auth_) => {
        authUser = _authUser_;
        $auth = _$auth_;
    }));
    
    describe('isAuthenticated', () => {
        it('uses $auth service to check if user is authenticated', () => {
            spyOn($auth, 'isAuthenticated').and.returnValue(true);
            
            let isAuthenticated = authUser.isAuthenticated();
            
            expect(isAuthenticated).toEqual(true);
        });
    });
    
    describe('getUserId', () => {
        it('returns the payload sub if user is authenticated', () => {
            spyOn($auth, 'isAuthenticated').and.returnValue(true);
            spyOn($auth, 'getPayload').and.returnValue({sub: 'user-id-123'});

            let userId = authUser.getUserId();

            expect(userId).toEqual('user-id-123');
        });

        it('returns undefined if the user is not authenticated', () => {
            spyOn($auth, 'isAuthenticated').and.returnValue(false);

            let userId = authUser.getUserId();

            expect(userId).toBeUndefined();
        });
    });
})