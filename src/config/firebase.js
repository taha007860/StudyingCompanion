import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBdDpc7e8oLR7TNbHToyOP_hVSF3u7d3Tk",
    authDomain: "studying-companion.firebaseapp.com",
    projectId: "studying-companion",
    storageBucket: "studying-companion.appspot.com",
    messagingSenderId: "816453069297",
    appId: "1:816453069297:web:a5517687b0305b2746fc50",
    measurementId: "G-HMMRDZB7C8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();