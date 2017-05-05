export class ProfileBlockDirective {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'app/components/profile/profileBlock.html'
        this.scope = {
            profile: '='
        };
    }
}