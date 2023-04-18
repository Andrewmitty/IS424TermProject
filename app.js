//add event listener to the button signupDone and remove the is-active class from the modal
document.getElementById("signupDone").addEventListener('click', function () {
    document.getElementById('signupModal').classList.remove('is-active');
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
});

