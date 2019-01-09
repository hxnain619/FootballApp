import * as firebase from "firebase";


const config = {
  // Change this to your firebase configuration! (Add Firebase to your web app)
  
    apiKey: "AIzaSyDMfJroPPu9TOi6SPXZ3cR7ncvBXSML5yo",
    authDomain: "youvincy-football-app.firebaseapp.com",
    databaseURL: "https://youvincy-football-app.firebaseio.com",
    projectId: "youvincy-football-app",
    storageBucket: "youvincy-football-app.appspot.com",
    messagingSenderId: "832964454378"
  
};


firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export {
  firebase,
  googleAuthProvider,
  facebookAuthProvider,
  database as default
};
