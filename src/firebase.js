import firebase from "firebase/compat/app";
import  'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCz4nDjaQMhAJmMUYQ_sAYyGxJj7MtMzWs",
  authDomain: "unizonep.firebaseapp.com",
  projectId: "unizonep",
  storageBucket: "unizonep.appspot.com",
  messagingSenderId: "631189601491",
  appId: "1:631189601491:web:8feff4071606a27f5ba826"
};


const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export default app;
