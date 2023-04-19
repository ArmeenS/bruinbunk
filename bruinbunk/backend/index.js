// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAorANm5qVnioPkPjRjrZPRO1XiiLKgkVU",
  authDomain: "bruinbunk.firebaseapp.com",
  projectId: "bruinbunk",
  storageBucket: "bruinbunk.appspot.com",
  messagingSenderId: "986912138929",
  appId: "1:986912138929:web:13c71739d68c4159c4e490",
  measurementId: "G-J7X1ZTTBM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export { app };