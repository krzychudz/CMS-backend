const firebase = require('firebase-admin');
const serviceAccount = require('./firebase_key.json');

firebase.initializeApp({
 credential: firebase.credential.cert(serviceAccount)
});

const firestoreDb = firebase.firestore();

module.exports = firestoreDb;