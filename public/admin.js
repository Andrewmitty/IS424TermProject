db.collection("orders").where('status', '!=', 'complete').orderBy('status').orderBy("time", "desc").get().then(function (data) {
    data.forEach(function (doc) {
        renderOrder(doc);
    })
});


function loadAllOrders() {
    document.getElementById('ordersColumn').innerHTML = "<p class='title'>All Orders</p>";

    db.collection("orders").orderBy('time', 'desc').get().then(function (data) {
        data.forEach(function (doc) {
            renderOrder(doc);
        })
    });
};

function renderOrder(data) {
    var div = document.getElementById("ordersColumn");
    var items = data.data().items;
    var itemString = "";
    items.forEach(function (item) {
        itemString += item.name;
        itemString += '<br>';
    })
    div.innerHTML += "<div class='box'> \
     <p class='title'> Order: " + data.id + "</p>\
        <p class='subtitle'>Time: " + data.data().time + "</p>\
        <p class='subtitle'>Name: " + data.data().name + "</p>\
        <p class='subtitle'>Email: " + data.data().email + "</p>\
        <p class='subtitle'>Phone: " + data.data().phone + "</p>\
        <p class='subtitle'>Special Notes: " + data.data().specialNotes + "</p>\
        <p class='title'>Items: </p> \
        <p class='subtitle'>" + itemString + "</p>\
        <p class='subtitle'>Status: " + data.data().status + "</p>\
        <button class='button is-success' onclick='completeOrder(\"" + data.id + "\")'>Complete</button>\
      </div>"
}


db.collection('contact').get().then(function (data) {
    data.forEach(function (doc) {
        renderContactFormResponse(doc);
    })
});

document.getElementById('cancelAdd').addEventListener('click', function () {
    document.getElementById('addItemModal').classList.remove("is-active");
});

function renderContactFormResponse(doc) {
    var div = document.getElementById("contactColumn");
    div.innerHTML += "<div class='box'> \
        <p class='title'> Time: " + doc.data().time + "</p>\
        <p class='subtitle'>Name: " + doc.data().name + "</p>\
        <p class='subtitle'>Email: " + doc.data().email + "</p>\
        <p class='subtitle'>Phone: " + doc.data().phone + "</p>\
        <p class='subtitle'>Preferred Contact: " + doc.data().preferredContact + "</p>\
        <p class='subtitle'>Contact Reason: " + doc.data().contactReason + "</p>\
        <p class='subtitle'>Message: " + doc.data().message + "</p>\
        <button class='button is-danger' onclick='deleteContact(\"" + doc.id + "\")'>Delete</button>\
        </div>"
};

function completeOrder(id) {
    db.collection('orders').doc(id).update({
        status: "complete"
    }).then(function () {
        location.reload();
    }).catch(function (error) {
        console.error("Error updating document: ", error);
        document.getElementById('notifications').innerHTML = "<div class='notification is-danger'> \
        <p> Error updating document: " + error + "</p>\
        </div>"
        setTimeout(function () {
            document.getElementById('notifications').innerHTML = "";
        }, 3000);
    });

};

function deleteContact(id) {
    db.collection('contact').doc(id).delete().then(function () {
        location.reload();
    })
};

db.collection('users').get().then(function (data) {
    data.forEach(function (doc) {
        renderUser(doc);
    })
});

function renderUser(doc) {
    var div = document.getElementById("usersColumn");
    div.innerHTML += "<div class='box'> \
        <p class='title'> Email: " + doc.data().email + "</p>\
        <p class='subtitle'>Name: " + doc.data().name + "</p>\
        <p class='subtitle'>Admin: " + doc.data().admin + "</p>\
        <button class='button is-danger' onclick='makeAdmin(\"" + doc.id + "\")'>Make Admin</button>\
        <button class='button is-danger' onclick='removeAdmin(\"" + doc.id + "\")'>Remove Admin</button>\
        </div>"
};

db.collection('items').get().then(function (data) {
    //TODO: add filter for category or item
    data.forEach(function (doc) {
        renderItem(doc);
    })
});

document.getElementById('addItemBtn').addEventListener('click', function () {
    console.log("Clicked");

});
// <p class='subtitle'>Description: " + doc.data().description + "</p>\ add for description to be rendered in the admin page
function renderItem(doc) {
    var div = document.getElementById("itemsColumn");
    div.innerHTML += "<div class='box'> \
        <p class='title'> Name: " + doc.data().name + "</p>\
        <p class='subtitle'>Price: " + doc.data().price + "</p>\
        <p class='subtitle'>Image: <br> <img src='" + doc.data().image + "'></p>\
        <p class='subtitle'>Category: " + doc.data().category + "</p>\
        <button class='button is-danger' onclick='deleteItem(\"" + doc.id + "\")'>Delete</button>\
        </div>"
};

function makeAdmin(uid) {
    db.collection('users').doc(uid).update({
        admin: true
    }).then(function () {
        location.reload();
    })
};

function removeAdmin(uid) {
    db.collection('users').doc(uid).update({
        admin: false
    }).then(function () {
        location.reload();
    })
}

function deleteItem(ID) {
    console.log("Deleting Item");
    console.log(ID);
    db.collection("items").doc(ID).delete().then(function () {
        console.log("Document successfully deleted!");
        location.reload();
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        document.getElementById('notifications').innerHTML = "<div class='notification is-danger'> \
        <p> Error removing document: " + error + "</p>\
        </div>"
        setTimeout(function () {
            document.getElementById('notifications').innerHTML = "";
        }, 3000);

    });
};

document.getElementById('submitItem').addEventListener('click', function () {
    //first need to upload image to storage. Then get the url and create a new item with that url and other info from the form
    var fileName = document.getElementById('itemImage').files[0].name;
    var file = document.getElementById('itemImage').files[0];
    var category = document.getElementById('itemCat').value;
    var storageRef = firebase.storage().ref(category + '/' + fileName);
    var uploadTask = storageRef.put(file);
    document.getElementById('submitItem').classList.add('is-loading')
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            document.getElementById('addItemModal').classList.remove("is-active");
            document.getElementById('notifications').innerHTML += "<div class='notification is-danger'>\
    <p class='title'>There was an error uploading the image. Please try again and make sure it is the right file.</p>\
    </div>"
            setTimeout(function () {
                document.getElementById('notifications').innerHTML = ""
            }, 3000)
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    var name = document.getElementById('itemName').value;
                    var description = document.getElementById('itemDesc').value;
                    var price = document.getElementById('itemPrice').value;
                    var image = downloadURL;
                    db.collection('items').add({
                        name: name,
                        description: description,
                        price: price,
                        image: image,
                        category: category
                    }).then(function () {
                        document.getElementById('addItemModal').classList.remove("is-active");
                        document.getElementById('notifications').innerHTML += "<div class='notification is-success'>\
        <p class='title'>Item Added Successfully!</p>\
        </div>"
                        setTimeout(function () {
                            document.getElementById('notifications').innerHTML = ""
                        }, 3000)
                    });

                }

            );
        });


});