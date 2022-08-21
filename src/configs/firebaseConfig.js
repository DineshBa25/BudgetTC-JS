import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getFunctions } from 'firebase/functions';
import {getDatabase} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDXVN-PBIso-VkzDOyR7iXuxN9SL5NOejg",
    authDomain: "budgettc-c8e98.firebaseapp.com",
    databaseURL: "https://budgettc-c8e98-default-rtdb.firebaseio.com",
    projectId: "budgettc-c8e98",
    storageBucket: "budgettc-c8e98.appspot.com",
    messagingSenderId: "1087798543507",
    appId: "1:1087798543507:web:f0b9654105c99c62493966",
    measurementId: "G-KS489D6RGJ"
};




export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service

export const functions = getFunctions(app);

export const database = getDatabase(app);
export const db = getFirestore(app);

export const auth = getAuth()
