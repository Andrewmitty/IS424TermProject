db.collection("orders").where('status','!=','complete').get().then(function (data) {
    data.forEach(function (doc) {
        renderOrder(doc);
    })
});

document.getElementById('allOrdersBtn').addEventListener('click', function () {
    document.getElementById('ordersColumn').innerHTML = "";
    db.collection("orders").get().then(function (data) {
        data.forEach(function (doc) {
            renderOrder(doc);
        })
    });
});

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
        <button class='button is-success' onclick='completeOrder(\"" + data.id + "\")'>Complete</button>\
      </div>"
}


db.collection('contact').get().then(function (data) {
    data.forEach(function (doc) {
        renderContactFormResponse(doc);
    })
});

document.getElementById('cancelAdd').addEventListener('click', function () {
    document.getElementById('addItemModal').classList.add("is-hidden");
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
}

function completeOrder(id) {
    db.collection('orders').doc(id).update({
        status: "complete"
    }).then(function () {
        location.reload();
    })
}

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
        </div>"
}

db.collection('items').get().then(function (data) {
    data.forEach(function (doc) {
        renderItem(doc);
    })
});

function renderItem(doc) {
    var div = document.getElementById("itemsColumn");
    div.innerHTML += "<div class='box'> \
        <p class='title'> Name: " + doc.data().name + "</p>\
        <p class='subtitle'>Description: " + doc.data().description + "</p>\
        <p class='subtitle'>Price: " + doc.data().price + "</p>\
        <p class='subtitle'>Image: <br> <img src='" + doc.data().image + "'></p>\
        <p class='subtitle'>Category: " + doc.data().category + "</p>\
        <button class='button is-danger' onclick='deleteItem(\"" + doc.id + "\")'>Delete</button>\
        </div>"
}

function makeAdmin(uid){
    db.collection('users').doc(uid).update({
        admin: true
    }).then(function(){
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
    });
};