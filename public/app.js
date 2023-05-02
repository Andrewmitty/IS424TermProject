//add event listener to the button signupDone and remove the is-active class from the modal
var provider = new firebase.auth.GoogleAuthProvider();
document.getElementById("signupDone").addEventListener('click', function () {
    document.getElementById('signupModal').classList.remove('is-active');
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            // ...
            db.collection('users').doc(user.uid).set({
                email: email
            })

            document.getElementById('notifications').innerHTML += "<div class='notification is-success'>Account Created</div>"
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById('notifications').innerHTML += "<div class='notification is-danger'>" + errorMessage + "</div>"
            setTimeout(function () {
                document.getElementById('notifications').innerHTML = ""
            }, 3000)
        })
});

//add event listener to the button signup and add the is-active class to the modal
document.getElementById('signup').addEventListener('click', function () {
    document.getElementById('signupModal').classList.add('is-active');
});

//add same for signin
document.getElementById('signin').addEventListener('click', function () {
    document.getElementById('signinModal').classList.add('is-active');
});

//add same for signinDone
document.getElementById('signinDone').addEventListener('click', function () {
    document.getElementById('signinModal').classList.remove('is-active');
    var email = document.getElementById('signinEmail').value;
    var password = document.getElementById('signinPassword').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // document.getElementById('notifications').innerHTML += "<div class='notification is-success'>Signed In</div>"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById('notifications').innerHTML += "<div class='notification is-danger'>" + errorMessage + "</div>"
            setTimeout(function () {
                document.getElementById('notifications').innerHTML = ""
            }, 3000)
        })
});

function enableAdminMode() {
    document.getElementById('adminLink').classList.remove('is-hidden');
}

function disableAdminMode() {
    document.getElementById('adminLink').classList.add('is-hidden');
}
//add same for signout
document.getElementById('signout').addEventListener('click', function () {
    signOut();
});


function signOut() {
    auth.signOut().then(() => {
        // Sign-out successful.
        document.getElementById('notifications').innerHTML += "<div class='notification is-success'>Signed Out</div>"
        setTimeout(function () {
            document.getElementById('notifications').innerHTML = ""
        }, 3000)
    }).catch((error) => {
        // An error happened.
        document.getElementById('notifications').innerHTML += "<div class='notification is-danger'>" + errorMessage + "</div>"
        setTimeout(function () {
            document.getElementById('notifications').innerHTML = ""
        }, 3000)
    });
}
document.getElementById('GoogleLogin').addEventListener('click', function () {
    console.log("clicked")
    auth.signInWithRedirect(provider);
});

document.getElementById('GoogleSignUp').addEventListener('click', function () {
    console.log("clicked")
    auth.signInWithRedirect(provider);
});
// auth.getRedirectResult().then((result) => {
//     if (result.credential) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var credential = result.credential;
//         console.log(credential)
//         // ...
//     }
//     // The signed-in user info.
//     var user = result.user;
//     var email = user.email;
//     db.collection('users').doc(user.uid).set({
//         email: email
//     });
// });
auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        email = user.email;
        db.collection('users').doc(user.uid).update({
            email: email
        });
        document.getElementById('notifications').innerHTML += "<div class='notification is-success'>Signed In</div>"
        setTimeout(function () {
            document.getElementById('notifications').innerHTML = ""
        }, 3000)
        document.getElementById('signin').classList.add('is-hidden');
        document.getElementById('signup').classList.add('is-hidden');
        document.getElementById('signout').classList.remove('is-hidden');

    } else {
        // No user is signed in.
        disableAdminMode();
        document.getElementById('signin').classList.remove('is-hidden');
        document.getElementById('signup').classList.remove('is-hidden');
        document.getElementById('signout').classList.add('is-hidden');

    }
})

document.getElementById('cancelSignUp').addEventListener('click', function () {
    document.getElementById('signupModal').classList.remove('is-active');
});

document.getElementById('cancelSignIn').addEventListener('click', function () {
    document.getElementById('signinModal').classList.remove('is-active');
});

async function getUidAsync() {
    while (auth.currentUser == null) {
        await new Promise(r => setTimeout(r, 500));
    }
    return auth.currentUser.uid;
}



getUidAsync().then(function (uid) {
    console.log(uid)
    db.collection("users").doc(uid).get().then(function (data) {
        console.log(data.data())
        if (data.data().admin) {
            if (data.data().admin == true) {
                console.log("admin mode enabled")
                document.getElementById('notifications').innerHTML += "<div class='notification is-warning'>Admin Mode Enabled</div>"
                setTimeout(function () {
                    document.getElementById('notifications').innerHTML = ""
                }, 3000)
                enableAdminMode();
            }
        } else {


        }
    })
});