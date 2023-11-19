// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyDrrPnCFzedavNF2CuxtBPQCuPIKwsC124',
  authDomain: 'tcl-25-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-25-smart-shopping-list',
  storageBucket: 'tcl-25-smart-shopping-list.appspot.com',
  messagingSenderId: '21029132286',
  appId: '1:21029132286:web:b277bc51d1d8ff464992af',
};

let fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db };
