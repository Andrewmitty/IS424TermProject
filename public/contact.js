document.getElementById("contactSubmit").addEventListener("click", function () {
    var name = document.getElementById('contactName').value
    var email = document.getElementById('contactEmail').value
    var phone = document.getElementById('contactPhone').value
    var message = document.getElementById('contactText').value
    var preferredContact = "";
    document.getElementsByName("prefContact").forEach(function (element) {
        if (element.checked) {
            preferredContact = element.value
        }
    })
    var contactReason = document.getElementById('contactReason').value
    var time = new Date().toString()
    if (name == "" || email == "" || phone == "" || message == "") {
        document.getElementById("notifications").innerHTML += "<div class='notification is-danger'>Please fill in all fields</div>"
        return;
    }
    else{
        db.collection('contact').add({
            name: name,
            email: email,
            phone: phone,
            message: message,
            preferredContact: preferredContact,
            contactReason: contactReason,
            time: time
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("notifications").innerHTML += "<div class='notification is-success'>Message Sent</div>"
        });
    }
});