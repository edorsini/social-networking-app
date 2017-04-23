/**
 * Front-end controller for the profile picture.
 */

export class PictureController {
    /**
     * Constructor for this controller.  Gets all the profile images.
     */
    constructor($http, authUser, API_URL) {
        'ngInject';

        this.$http = $http;
        this.API_URL = API_URL;
        this.userId = authUser.getUserId();
        //alert('user is: ' + this.userId);
        this.getAllPictures();
    }

    /**
     * Gets all profile image files.
     */
    getAllPictures() {
        var vm = this;
        this.$http.get(this.API_URL + 'api/pictures').then(function(result) {
            vm.files = result.data;
        });
    }

    /**
     * Deletes a particular picture.
     */
    removePicture(pictureId) {
        var vm = this;
        this.$http.post(this.API_URL + 'api/picture/remove/' + pictureId).then(function(result) {
            vm.getAllPictures();
        });
    }

    /**
     * Sets a picture as the profile picture.
     */
    setProfilePicture(pictureId) {
		var vm = this;
		console.log('Set User', this.userId);
		console.log('Set Pict', pictureId);
		var upinfo = this.userId + ':' + pictureId;
//		console.log('UPinfo ',typeof(upinfo));
//		console.log('UPsplit ', upinfo.indexOf(':') );
//		console.log('UPuser ', upinfo.substring(0, upinfo.indexOf(":")));
//		console.log('UPpict ', upinfo.substring(upinfo.indexOf(':') +1));
		this.$http.post(this.API_URL + 'api/picture/setprofilepicture/' + upinfo);
    }

}
