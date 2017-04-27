/**
 * Front-end controller for the profile picture.
 */

export class PictureController {
    /**
     * Constructor for this controller.  Gets all the profile images.
     */
    constructor($http, $sce, $stateParams, authUser, API_URL) {
        'ngInject';

        this.$http = $http;
        this.API_URL = API_URL;
        this.formUrl = $sce.trustAsResourceUrl(API_URL + 'api/picture');
        this.userId = $stateParams.userId;
        this.currentUser = authUser.getUserId();
        this.isAlbumOwner = this.userId == this.currentUser;
        this.getAllPictures();
        this.file = {};
    }

    /**
     * Gets all profile image files.
     */
    getAllPictures() {
        var vm = this;
        this.$http.get(this.API_URL + 'api/pictures/' + this.userId).then(function(result) {
            vm.files = result.data;
        });
    }

    /**
     * Deletes a particular picture.
     */
    removePicture(pictureId) {
        var vm = this;
        this.$http.post(this.API_URL + 'api/picture/remove/' + pictureId).then(function() {
            vm.getAllPictures();
        });
    }

    /**
     * Sets a picture as the profile picture.
     */
    setProfilePicture(pictureId) {
        var upinfo = this.userId + ':' + pictureId;
        this.$http.post(this.API_URL + 'api/picture/setprofilepicture/' + upinfo);
    }

}
