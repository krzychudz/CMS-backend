const firebase = require('firebase-admin');
const serviceAccount = require('./firebase_key.json');

firebase.initializeApp({
 credential: firebase.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
});

exports.firebaseDb = firebase.firestore();
exports.firebaseAuth = firebase.auth();

