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
auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById('notifications').innerHTML += "<div class='notification is-success'>Signed In</div>"
        setTimeout(function () {
            document.getElementById('notifications').innerHTML = ""
        }, 3000)
        document.getElementById('signin').classList.add('is-hidden');
        document.getElementById('signup').classList.add('is-hidden');
        document.getElementById('signout').classList.remove('is-hidden');
    } else {
        // No user is signed in.
        document.getElementById('signin').classList.remove('is-hidden');
        document.getElementById('signup').classList.remove('is-hidden');
        document.getElementById('signout').classList.add('is-hidden');
    }
})