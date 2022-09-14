import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const useAuth =()=>{

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCppSRWNxFy56Xlea6Mj6_CsZlvBPSkZw",
  authDomain: "local-bazar-2c557.firebaseapp.com",
  projectId: "local-bazar-2c557",
  storageBucket: "local-bazar-2c557.appspot.com",
  messagingSenderId: "999224368731",
  appId: "1:999224368731:web:010dffadc0b5b93f8f297e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
return[auth];
}

export default useAuth;