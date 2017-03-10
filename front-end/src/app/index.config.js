export function config ($logProvider, toastrConfig, $authProvider, API_URL) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
    
    $authProvider.signupUrl = API_URL + 'auth/register';
    $authProvider.loginUrl = API_URL + 'auth/login';

    $authProvider.facebook({
        clientId: '1358487534247698',
        url: API_URL + 'auth/facebook'
    });
}
