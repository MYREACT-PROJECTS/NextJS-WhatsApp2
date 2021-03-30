import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyC9NHDUH1xjbgGcL-4KEX01DpI-p3B0k28",
    authDomain: "whatsapp2-8ef81.firebaseapp.com",
    projectId: "whatsapp2-8ef81",
    storageBucket: "whatsapp2-8ef81.appspot.com",
    messagingSenderId: "930935634463",
    appId: "1:930935634463:web:9e59d35bf4391214d0732a"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();
  const db = app.firestore();
  const auth = app.auth();
  const provider= new firebase.auth.GoogleAuthProvider()

  export {db,auth,provider}