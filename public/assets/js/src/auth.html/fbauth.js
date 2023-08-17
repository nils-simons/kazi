// Initialize the FirebaseUI Widget using Firebase.
console.log('SIGN-IN')



const urlParams = new URLSearchParams(window.location.search);
const from_url = urlParams.get('from_url');

successUrl = './?sign_up_success=true'
if (from_url) {
  successUrl = from_url.replaceAll('%26', '&')
}

var ui = new firebaseui.auth.AuthUI(auth);
ui.start('#firebaseui-auth-container', {
  callbacks: {
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader-anim').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: successUrl,
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      }
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID // Other providers don't need to be given as object.
  ],
  // Terms of service url.
  tosUrl: 'https://www.bkgut.de/impressum.html',
  // Privacy policy url.
  privacyPolicyUrl: 'https://www.bkgut.de/datenschutz.html'
});