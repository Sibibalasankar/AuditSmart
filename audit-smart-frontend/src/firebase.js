import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAvBmTZ7nl05V_QD0vm0x4p2-a7rr8q3hE",
    authDomain: "auditsmart-66324.firebaseapp.com",
    projectId: "auditsmart-66324",
    storageBucket: "auditsmart-66324.firebasestorage.app",
    messagingSenderId: "421638767918",
    appId: "1:421638767918:web:ec022d95eee2ed9307e6bf",
    measurementId: "G-02E7ZZPC6B"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };