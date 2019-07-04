//Firebase
import * as firebase from '../node_modules/firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8DcDLA9ksP2GsAUEfnu0gZm48R5mps9s",
    authDomain: "bugsmanager-8f66d.firebaseapp.com",
    databaseURL: "https://bugsmanager-8f66d.firebaseio.com",
    projectId: "bugsmanager-8f66d",
    storageBucket: "",
    messagingSenderId: "345845082304",
    appId: "1:345845082304:web:3280019aa7596de0"
  };
  
firebase.initializeApp(firebaseConfig);