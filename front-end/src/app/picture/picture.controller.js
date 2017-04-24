/**
 * Front-end controller for the profile picture.
 */

export class PictureController {
    /**
     * Constructor for this controller.  Gets all the profile images.
     */
    constructor($http, authUser) {
        'ngInject';

        this.$http = $http;
        this.userId = authUser.getUserId();
        //alert('user is: ' + this.userId);
        this.getAllPictures();

        this.file = {};
    }

    /**
     * Gets all profile image files.
     */
    getAllPictures(message) {
        var vm = this;
        vm.message = message;
        this.$http.get('http://localhost:5000/api/pictures').then(function(result) {
            vm.files = result.data;
        });
    }

    /**
     * Deletes a particular picture.
     */
    removePicture(pictureId) {
        var vm = this;
        this.$http.post('http://localhost:5000/api/picture/remove/' + pictureId).then(function(result) {
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
        //      console.log('UPinfo ',typeof(upinfo));
        //      console.log('UPsplit ', upinfo.indexOf(':') );
        //      console.log('UPuser ', upinfo.substring(0, upinfo.indexOf(":")));
        //      console.log('UPpict ', upinfo.substring(upinfo.indexOf(':') +1));
        this.$http.post('http://localhost:5000/api/picture/setprofilepicture/' + upinfo);
    }

}
