import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAjt17zu61SUI01nH5ID9-RVuIF2V6zALw",
  authDomain: "mobilefirebase-426b3.firebaseapp.com",
  projectId: "mobilefirebase-426b3",
  storageBucket: "mobilefirebase-426b3.appspot.com",
  messagingSenderId: "995643216745",
  appId: "1:995643216745:web:ecd6340dcfe4d61cb623f8",
  measurementId: "G-EYXTQJJ4PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const authentication = getAuth(app);
