import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const config = {
  apiKey: 'AIzaSyAV0MkVcVMuZaoEDMAfcyDnbp8OUEC_8DA',
  authDomain: 'pachista-9126c.firebaseapp.com',
  databaseURL: 'https://pachista-9126c.firebaseio.com',
  projectId: 'pachista-9126c',
  storageBucket: '',
  messagingSenderId: '1055613955429',
  appId: '1:1055613955429:web:b5ac60d46797f1fd',
};

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};
firebase.initializeApp(config);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
export {
  firebase, ui, uiConfig,
};
