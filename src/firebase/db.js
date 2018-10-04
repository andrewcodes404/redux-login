import { db } from './firebase';


// User API

///SET//////SET//////SET//////SET//////SET//////SET//////SET///
export const doCreateUser = (id, username, email) =>{
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

export const doUploadUrl = (uid, url, filename) => {
    // A post entry.
    var postData = {
        uid: uid,
        filename: filename,
        url: url
    };

    // Get a key for a new Post.
    var newPostKey = db.ref(`users/${uid}`).child('images').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/images/' + newPostKey] = postData;
    // updates['/user-photo/' + uid + '/' + newPostKey] = postData;

    return db.ref(`users/${uid}`).update(updates);
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