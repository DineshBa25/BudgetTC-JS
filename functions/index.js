const functions = require("firebase-functions");
const firebase = require("firebase-admin");

firebase.initializeApp()
let firestore = firebase.firestore();
//firestore.settings({ ignoreUndefinedProperties: true })
exports.nextQuote = functions.pubsub
    .schedule('0 0 * * *')
    .onRun(async () => {
        const users = firestore.collection('users')
        const user = await users.get()
        user.forEach(snapshot => {
            snapshot.ref.update({quote: Math.floor(Math.random() * 45)})
        })
        return null;
    })