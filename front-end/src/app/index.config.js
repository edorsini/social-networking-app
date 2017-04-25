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
    
    $authProvider.signupUrl = API_URL + 'api/auth/register';
    $authProvider.loginUrl = API_URL + 'api/auth/login';
    $authProvider.facebook({
        clientId: '1358487534247698',
        url: API_URL + 'api/auth/facebook'
    });
    
    $authProvider.google({
        clientId: '682539259463-f90t26isi55vgcerql5ur89jg9dfo79e.apps.googleusercontent.com',
        url: API_URL + 'api/auth/google'
    });
}
