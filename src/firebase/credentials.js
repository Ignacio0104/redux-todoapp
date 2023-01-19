// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5S8YCiiBpSxpp3T_1YKN2RGvhiBv4b-4",
  authDomain: "redux-todoapp-smirlian.firebaseapp.com",
  projectId: "redux-todoapp-smirlian",
  storageBucket: "redux-todoapp-smirlian.appspot.com",
  messagingSenderId: "237299531237",
  appId: "1:237299531237:web:c0f4f027a77dbbc03a030c"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);