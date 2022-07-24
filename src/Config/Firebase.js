// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClWWsGmzsbOVyPv5iDqwKkiXEDcSpW4uw",
  authDomain: "my-todo-1234.firebaseapp.com",
  projectId: "my-todo-1234",
  storageBucket: "my-todo-1234.appspot.com",
  messagingSenderId: "948802509595",
  appId: "1:948802509595:web:6d8fabb957675a17c291be",
  measurementId: "G-QJL3MYYDJL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { analytics, firestore, auth };
