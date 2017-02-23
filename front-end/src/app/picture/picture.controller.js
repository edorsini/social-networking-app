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
        this.getMessages();
    }

    /**
     * Gets all profile images.
     */
    getMessages() {
        var vm = this;
        console.log("gets all my pictures");
        this.$http.get('http://localhost:5000/api/message').then(function(result) {
            vm.messages = result.data;
        });
    }

    /**
     * Posts a profile picture.
     */
    postPicture() {
        console.log("saves a picture");
        this.$http.post('http://localhost:5000/api/message', { msg: this.message });
    }



}
