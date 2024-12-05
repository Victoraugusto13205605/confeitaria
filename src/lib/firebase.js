import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCv1go1Bht-l0aDpmSWlB_48-JHlLKleOg",
  authDomain: "appbolo-cbfb4.firebaseapp.com",
  projectId: "appbolo-cbfb4",
  storageBucket: "appbolo-cbfb4.firebasestorage.app",
  messagingSenderId: "900987910338",
  appId: "1:900987910338:web:94eafb03b59cd788dea35b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);