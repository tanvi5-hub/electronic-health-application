import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD13xG4R_YN7jt3LUQVBWmOwSdFbXSsV_8",
    authDomain: "electronic-health-applic-2ff8e.firebaseapp.com",
    projectId: "electronic-health-applic-2ff8e",
    storageBucket: "electronic-health-applic-2ff8e.appspot.com",
    messagingSenderId: "460345209150",
    appId: "1:460345209150:web:e5a5136db6097ce188bc6f",
    measurementId: "G-2ZTFJGJD2T"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };