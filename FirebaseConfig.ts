
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlyvS1eIRccuVIQnxi8SSnx_2vDW6Nq8k",
    authDomain: "clique-raft.firebaseapp.com",
    projectId: "clique-raft",
    storageBucket: "clique-raft.appspot.com",
    messagingSenderId: "120293268568",
    appId: "1:120293268568:web:94652aab2a08cd8c443e2d",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
