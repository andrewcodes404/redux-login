import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';


const prodConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: '',
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
};


const devConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMIAN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSY_ID
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

if(!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = firebase.database();
const auth = firebase.auth();

export {
    auth,
    db,
};