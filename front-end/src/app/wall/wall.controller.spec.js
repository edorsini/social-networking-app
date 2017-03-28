describe('controller wall', () => {
    let vm, $scope, $http, $q, getPostsDeferred;
    
    beforeEach(angular.mock.module('friendZone'));
    
    beforeEach(inject(($controller, $rootScope, _$http_, _$q_) => {
        $scope = $rootScope.$new();
        $http = _$http_;
        $q = _$q_;
        getPostsDeferred = $q.defer();
        
        let $stateParams = {
            userId: 'myUserId'
        };
        
        spyOn($http, 'get').and.returnValue(getPostsDeferred.promise);
        
        vm = $controller('WallController', {
            $http: $http,
            $stateParams: $stateParams
        });
    }));
    
    describe('what it does on page load', () => {
        it('calls the wall api for the given userId and sets the result on the scope', () => {
            expect($http.get).toHaveBeenCalledWith('http://localhost:5000/api/wall/myUserId');
            
            let wallData = 'my wall data';
            getPostsDeferred.resolve({ data: wallData });
            
            $scope.$apply();
            
            expect(vm.posts).toEqual(wallData);
        });
    });
    
    describe('makePost', () => {
        beforeEach(() => {
            getPostsDeferred.resolve({ data: 'my posts' });
            $scope.$apply();
        });
        
        it('calls the wall api and passes the post message', () => {
            spyOn($http, 'post').and.returnValue($q.defer().promise);
            
            let postMsg = "here is my post";
            vm.post = { msg: postMsg };
            
            vm.makePost();
            
            expect($http.post).toHaveBeenCalledWith('http://localhost:5000/api/wall/myUserId', { postMsg: postMsg });
        });
        
        it('clears the post message and gets the posts after successful call to wall api', () => {
            let makePostDeferred = $q.defer();
            spyOn($http, 'post').and.returnValue(makePostDeferred.promise);
            
            vm.post = { msg: 'post' };
            
            vm.makePost();
            
            expect($http.get.calls.count()).toEqual(1);
            
            makePostDeferred.resolve();
            $scope.$apply();
            
            expect(vm.post.msg).toEqual('');
            expect($http.get.calls.count()).toEqual(2);
        });
    });
});