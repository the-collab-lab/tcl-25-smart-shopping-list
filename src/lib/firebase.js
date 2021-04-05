// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyCejH0C07KHO9dkIotMDZVBqbmfdHhe4-s',
  authDomain: 'tcl-25-shopping-list.firebaseapp.com',
  projectId: 'tcl-25-shopping-list',
  storageBucket: 'tcl-25-shopping-list.appspot.com',
  messagingSenderId: '297367476509',
  appId: '1:297367476509:web:f0edb0eee0a15b24fa69f4',
};

let fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db };
