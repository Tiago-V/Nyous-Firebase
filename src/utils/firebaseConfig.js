import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBcIsj_d_sZvdRc_tlr8zhoVME2-_KQV58",
    authDomain: "nyous-1346e.firebaseapp.com",
    projectId: "nyous-1346e",
    storageBucket: "nyous-1346e.appspot.com",
    messagingSenderId: "493251751958",
    appId: "1:493251751958:web:b1876847327204173d8537"
  };

  const app = firebase.initializeApp(firebaseConfig);

  // Para ultilizar firestore
  export const db = app.firestore();

  export default firebaseConfig;