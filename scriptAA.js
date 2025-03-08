// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYzyD_ayAh24zpcfCI_AShXWj-QcD_O78",
  authDomain: "tsai-e32f5.firebaseapp.com",
  projectId: "tsai-e32f5",
  storageBucket: "tsai-e32f5.firebasestorage.app",
  messagingSenderId: "504906565418",
  appId: "1:504906565418:web:1eff88b8c1fca8441ec053",
  measurementId: "G-5HMQQ13YCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
