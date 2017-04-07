describe('controller options', () => {
    let vm, $controller, $scope, $http, $q, authUser, getProfileDeferred;
    
    beforeEach(angular.mock.module('friendZone'));
    
    beforeEach(inject((_$controller_, $rootScope, _$http_, _$q_, _authUser_) => {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $http = _$http_;
        $q = _$q_;
        authUser = _authUser_;
        getProfileDeferred = $q.defer();
        
        let $stateParams = {
            userId: 'myUserId'
        };
        
        spyOn($http, 'get').and.returnValue(getProfileDeferred.promise);
        spyOn(authUser, 'getUserId').and.returnValue('myUserId');
        
        vm = $controller('OptionsController', {
            $http: $http,
            $stateParams: $stateParams,
            authUser
        });
    }));
    
    describe('what it does on page load', () => {
        it('puts the profile owner\'s user id on the scope', () => {
            expect(vm.userId).toEqual('myUserId');
        });
        
        it('sets editing mode to false', () => {
            expect(vm.editing).toEqual(false);
        });
        
        it('sets ownProfile to true if the logged in user is the profile owner', () => {
            expect(vm.ownProfile).toEqual(true);
        });
        
        it('sets ownProfile to false if the logged in user is not the profile owner', () => {
            let vm = $controller('OptionsController', {
                $http: $http,
                $stateParams: {userId: 'differentUserId'},
                authUser
            });
            
            expect(vm.ownProfile).toEqual(false);
        });
        
        it('calls the profile api for the given userId and sets the result on the scope', () => {
            expect($http.get).toHaveBeenCalledWith('http://localhost:5000/api/profile/myUserId');
            
            let profileData = 'my profile data';
            getProfileDeferred.resolve({ data: profileData });
            
            $scope.$apply();
            
            expect(vm.profile).toEqual(profileData);
        });
    });
    
    describe('editProfile', () => {
        it('copies profile to profileEdit', () => {
            vm.profile = {
                data: 'value'
            };
            
            vm.profileEdit = {};
            
            vm.editProfile();
            
            expect(vm.profileEdit).toEqual(vm.profile);
            expect(vm.profileEdit == vm.profile).toEqual(false);
        });
        
        it('sets editing mode to true', () => {
            vm.editing = false;
            
            vm.editProfile();
            
            expect(vm.editing).toEqual(true);
        });
    });
    
    describe('resetProfile', () => {
        it('sets editing mode to false', () => {
            vm.editing = true;
            
            vm.resetProfile();
            
            expect(vm.editing).toEqual(false);
        });
    });
    
    describe('saveProfile', () => {
        it('calls the profile api and passes the profileEdit data on the scope', () => {
            spyOn($http, 'post').and.returnValue($q.defer().promise);
            
            let profileData = { profile: 'data' };
            vm.profileEdit = profileData;
            
            vm.saveProfile();
            
            expect($http.post).toHaveBeenCalledWith('http://localhost:5000/api/profile', profileData);
        });
        
        it('sets saving to true while saving', () => {
            vm.saving = false;
            
            vm.saveProfile();
            
            expect(vm.saving).toEqual(true);
        });
        
        it('sets edited profile info to profile after saving', () => {
            let saveProfileDeferred = $q.defer();
            spyOn($http, 'post').and.returnValue(saveProfileDeferred.promise);
            
            let oldProfileData = { profile: 'old data'};
            let newProfileData = { profile: 'new data'};
            vm.profile = oldProfileData;
            vm.profileEdit = newProfileData;
            
            vm.saveProfile();
            
            expect(vm.profile).toEqual(oldProfileData);
            
            saveProfileDeferred.resolve();
            $scope.$apply();
            
            expect(vm.profile).toEqual(newProfileData);
        });
        
        it('sets saving to false after saving', () => {
            let saveProfileDeferred = $q.defer();
            spyOn($http, 'post').and.returnValue(saveProfileDeferred.promise);
            
            vm.saveProfile();
            
            expect(vm.saving).toEqual(true);
            
            saveProfileDeferred.resolve();
            $scope.$apply();
            
            expect(vm.saving).toEqual(false);
        });
        
        it('sets editing to false after saving', () => {
            let saveProfileDeferred = $q.defer();
            spyOn($http, 'post').and.returnValue(saveProfileDeferred.promise);
            
            vm.editing = true;
            
            vm.saveProfile();
            
            expect(vm.editing).toEqual(true);
            
            saveProfileDeferred.resolve();
            $scope.$apply();
            
            expect(vm.editing).toEqual(false);
        });
    });
});