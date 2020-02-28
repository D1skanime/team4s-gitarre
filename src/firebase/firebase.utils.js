import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDQr2v7_rloHVohq9tLiXJ0DEDfsBX0nbY",
    authDomain: "gitarr-db.firebaseapp.com",
    databaseURL: "https://gitarr-db.firebaseio.com",
    projectId: "gitarr-db",
    storageBucket: "gitarr-db.appspot.com",
    messagingSenderId: "454487508442",
    appId: "1:454487508442:web:72d25d13c83af432982ce3",
    measurementId: "G-B5KDLJDWNS"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({promt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;