import firebase from "firebase/app";
import "firebase/firebase-database";

const firebaseConfig = {
  apiKey: "AIzaSyDCkd2co8mJXrTI9jMVbfVRYCim2SfVaog",
  authDomain: "chronogram-d91a6.firebaseapp.com",
  databaseURL: "https://chronogram-d91a6-default-rtdb.firebaseio.com",
  projectId: "chronogram-d91a6",
  storageBucket: "chronogram-d91a6.appspot.com",
  messagingSenderId: "238934965715",
  appId: "1:238934965715:web:87df9b7d64925b1a688326",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database;
