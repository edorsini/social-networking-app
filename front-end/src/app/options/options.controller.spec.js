describe('controller options', () => {
    let vm, $scope, $http, $q, getProfileDeferred;
    
    beforeEach(angular.mock.module('friendZone'));
    
    beforeEach(inject(($controller, $rootScope, _$http_, _$q_) => {
        $scope = $rootScope.$new();
        $http = _$http_;
        $q = _$q_;
        getProfileDeferred = $q.defer();
        
        let $stateParams = {
            userId: 'myUserId'
        };
        
        spyOn($http, 'get').and.returnValue(getProfileDeferred.promise);
        
        vm = $controller('OptionsController', {
            $http: $http,
            $stateParams: $stateParams
        });
    }));
    
    describe('what it does on page load', () => {
        it('calls the profile api for the given userId and sets the result on the scope', () => {
            expect($http.get).toHaveBeenCalledWith('http://localhost:5000/api/profile/myUserId');
            
            let profileData = 'my profile data';
            getProfileDeferred.resolve({ data: profileData });
            
            $scope.$apply();
            
            expect(vm.profile).toEqual(profileData);
        });
    });
    
    describe('saveProfile', () => {
        it('calls the profile api and passes the profile data on the scope', () => {
            spyOn($http, 'post');
            
            let profileData = { profile: 'data' };
            vm.profile = profileData;
            
            vm.saveProfile();
            
            expect($http.post).toHaveBeenCalledWith('http://localhost:5000/api/profile', profileData);
        });
    });
});