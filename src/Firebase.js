

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQCLluw8nkFfsH4Zz6TcMALAO0arA8Xds",
  authDomain: "mis-hamza-rafay.firebaseapp.com",
  projectId: "mis-hamza-rafay",
  storageBucket: "mis-hamza-rafay.appspot.com",
  messagingSenderId: "1036705782199",
  appId: "1:1036705782199:web:564600edd887005c62b032",
  measurementId: "G-6PPEDBT4TH"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
