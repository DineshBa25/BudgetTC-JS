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

/*
updateAmount data requires the following:
    id: the id of the user
    newValue: the new amount allocated to the item
    category: the category of the item
    fullName: the full name of the item
 */
exports.updateAmount = functions.https.onCall(async(data) => {
    const address = "budget." + data.category + '.items.' + data.fullName + '.amount'
    const address2 = "budget." + data.category + '.amount'
    await firestore.collection("users").doc(data.id).update({
        [address]: data.newValue,
        [address2]: data.newValue + data.oldValue
    })
        .then(() => {
                console.log('Successfully updated AMOUNT in doc')
            }
        ).catch((err) => {
                console.log('Error updating doc:', err)
            }
        );
    return {
        success: true,
        address: [address],
        newAmount: data.newValue + data.oldValue
    };
});

/*
updateName data requires the following:
    id: the id of the user
    category: the category of the item
    fullName: the full name of the item
    newValue: the new name of the item

 */
exports.updateName = functions.https.onCall(async(data) => {
    const address = "budget." + data.category + '.items.' + data.fullName + '.fullName';
    //const newad = address.toString();
    console.log(data);
    await firestore.collection("users").doc(data.id).update({
        [address]: data.newValue
    })
        .then(() => {
                console.log('Successfully updated NAME in doc')
            }
        ).catch((err) => {
                console.log('Error updating doc:', err)
            }
        );
    return {
        success: true,
        address: [address],
        newName: data.newValue
    };
});