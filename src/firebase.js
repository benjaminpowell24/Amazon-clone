import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA1xQF9AXKD0WGuvcP3onFzI-Yp-nnfm68",
    authDomain: "clone-bfcfe.firebaseapp.com",
    databaseURL: "https://clone-bfcfe.firebaseio.com",
    projectId: "clone-bfcfe",
    storageBucket: "clone-bfcfe.appspot.com",
    messagingSenderId: "721571898791",
    appId: "1:721571898791:web:6b7e04d4a23c529ff50282",
    measurementId: "G-H9GG479QBZ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export {db, auth};