export class ProfileWidgetDirective {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'app/components/profile/profileWidget.html'
        this.scope = {
            profile: '='
        };
    }
}