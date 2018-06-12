import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDSe7h9cFHRzmXWKL8_db4DLQ6vNzYanRU",
    authDomain: "fuel-manager-f1d75.firebaseapp.com",
    databaseURL: "https://fuel-manager-f1d75.firebaseio.com",
    projectId: "fuel-manager-f1d75",
    storageBucket: "fuel-manager-f1d75.appspot.com",
    messagingSenderId: "57775689014"
};

const appFire = firebase.initializeApp(config);

const base = Rebase.createClass(appFire.database());

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
console.log('app base', facebookProvider, googleProvider);

export { appFire, base, facebookProvider, googleProvider };