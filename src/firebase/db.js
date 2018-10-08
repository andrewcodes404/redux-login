import { db } from './firebase';


// User API

///SET//////SET//////SET//////SET//////SET//////SET//////SET///
export const doCreateUser = (id, username, email) => {
    db.ref(`users/${id}`).set({
        id,
        username,
        email,
    });

}


// export const doUploadUrl = (id, url, filename) =>
//     db.ref(`users/${id}/images`).set({
//         url,
//         filename,
//     });

export const setUserContent = (uid, text) => {
    var date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    const time = date.getTime()
    var createdAt = `${year}${month}${dt}${time}`
    // A post entry.
    var postData = {
        uid: uid,
        text: text,
        created: createdAt,
    };


    // Get a key for a new Post.
    // var newPostKey = db.ref(`users/${uid}`).child('userContent').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    // var updates = {};
    // updates['/images/' + newPostKey] = postData;
    // updates['/user-photo/' + uid + '/' + newPostKey] = postData;
    console.log("uid from firedb : ", uid);
    console.log("postData from firedb : ", postData);
    return db.ref(`users/${uid}/userContent/${createdAt}/`).set(postData);

}





///ONCE//////ONCE//////ONCE//////ONCE//////ONCE//////ONCE//////ONCE///

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const onceGetUser = (id) => db.ref(`users/${id}`).once('value');

// db.ref('/users/' + id).once('value')

// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
//     var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//     // ...
// });