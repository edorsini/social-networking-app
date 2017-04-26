export function config ($logProvider, toastrConfig, $authProvider, API_URL, FACEBOOK_CLIENT_ID, GOOGLE_CLIENT_ID) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
    
    $authProvider.signupUrl = API_URL + 'api/auth/register';
    $authProvider.loginUrl = API_URL + 'api/auth/login';
    $authProvider.facebook({
        clientId: FACEBOOK_CLIENT_ID,
        url: API_URL + 'api/auth/facebook'
    });
    
    $authProvider.google({
        clientId: GOOGLE_CLIENT_ID,
        url: API_URL + 'api/auth/google'
    });
}
