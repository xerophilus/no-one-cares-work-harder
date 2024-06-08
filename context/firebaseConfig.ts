import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbsMlwD6YPK7r5VvqapQLnCb7IXRzbFw4",
    authDomain: "rise-and-endure.firebaseapp.com",
    projectId: "rise-and-endure",
    storageBucket: "rise-and-endure.appspot.com",
    messagingSenderId: "84377797821",
    appId: "1:84377797821:web:c6ec3c2346c67b3dfc23d4",
    measurementId: "G-GBH3CJ3X8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: Platform.OS == 'web' ? browserSessionPersistence : getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);