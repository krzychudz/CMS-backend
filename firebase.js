const firebase = require('firebase-admin');
const serviceAccount = require('./firebase_key.json');

firebase.initializeApp({
 credential: firebase.credential.cert(serviceAccount)
});

exports.firebaseDb = firebase.firestore();
exports.firebaseAuth = firebase.auth();

