import app from 'firebase/app';
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBk_JoMbyV-PlSWQjl2gr_ppk79UByw-Q4",
  authDomain: "proyecto-final-85578.firebaseapp.com",
  projectId: "proyecto-final-85578",
  storageBucket: "proyecto-final-85578.firebasestorage.app",
  messagingSenderId: "462378672219",
  appId: "1:462378672219:web:3c8e91c6bc5438c7319f7e"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
