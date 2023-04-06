// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo7OshwyKh6ScX_Lj8HwbQjPuP4e4PrZ8",
  authDomain: "sunband-auth.firebaseapp.com",
  projectId: "sunband-auth",
  storageBucket: "sunband-auth.appspot.com",
  messagingSenderId: "485555202607",
  appId: "1:485555202607:web:72b1a8a0d7a19dc21f34da"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.database();

export {auth, db};
