/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { PictureController } from './picture/picture.controller'; // edorsini
import { NavbarController } from './components/navbar/navbar.controller';
import { CompareToDirective } from './directives/compareTo.directive';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('ezStateFront', ['ui.router', 'ui.bootstrap', 'toastr', 'satellizer'])
    .constant('API_URL', 'http://localhost:5000/')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('githubContributor', GithubContributorService)
    .service('webDevTec', WebDevTecService)
    .controller('MainController', MainController)
    .controller('AuthController', AuthController)
    .controller('PictureController', PictureController) // edorsini
    .controller('NavbarController', NavbarController)
    .directive('acmeNavbar', NavbarDirective)
    .directive('acmeMalarkey', MalarkeyDirective)
    .directive('compareTo', CompareToDirective);
