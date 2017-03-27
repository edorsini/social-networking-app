/**
 * Front-end controller for the profile picture.
 */

export class PictureController {
    /**
     * Constructor for this controller.  Gets all the profile images.
     */
    constructor($http) {
        'ngInject';

        this.$http = $http;
        this.getAllPictures();
    }

    /**
     * Gets all profile image files.
     */
    getAllPictures() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/pictures').then(function(result) {
            vm.files = result.data;
        });
    }

    /**
     * Deletes a particular profile picture.
     */
    removePicture() {
        // Need to do.
    }

    /**
     * Sets a picture as the profile picture.
     */
    setPicture() {
        // Need to do.
    }

}
