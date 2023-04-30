db.collection('items').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderMenu(doc);
    })
});


function renderMenu(doc) {
    console.log(doc)
    var id = doc.id
    var cat = doc.data().category
    var name = doc.data().name
    var price = doc.data().price
    var desc = doc.data().description
    var img = doc.data().image
    var avail = doc.data().available

    if (cat == "Appetizers") {
        var div = document.getElementById("tileParApps");
    } else if (cat == "Mains") {
        var div = document.getElementById("tileParMain");
    } else if (cat == "Dessert") {
        var div = document.getElementById("tileParDesserts");
    } else if (cat == "Beverages") {
        var div = document.getElementById("tileParDrinks");
    } else if (cat == "Cakes") {
        var div = document.getElementById("tileParCakes");
    } else if (cat == "Cupcakes") {
        var div = document.getElementById("tileParCupcakes");
    }

    div.innerHTML += "<div class='tile is-child box is-2'> <div class='is-danger'> <button class='button is-danger admin is-hidden' onClick=deleteItem('" + id + "')> <i class='fa-sharp fa-solid fa-trash'></i> </button> </div> <p class='title'>" + name + "</p>  <p class='subtitle'>" + price + "</p>  <p class='subtitle'>" + desc + "</p>  <p class='subtitle'>" + cat + "</p>  <figure class='image is-4by3'>    <img src='" + img + "'>  </figure> <button class='button m-2 has-background-success' onClick=addToCart('" + id + "')>Add to Cart</button></div>"
}
auth.onAuthStateChanged(function (user) {
    if (user) {
        getUidAsync().then(function (uid) {
            db.collection("users").doc(uid).get().then(function (data) {
                if (data.data().admin == true) {
                    enableAdminMenu();
                    document.getElementById('notifications').innerHTML += "<div class='notification is-warning'>Admin Mode Enabled</div>"
                    setTimeout(function () {
                        document.getElementById('notifications').innerHTML = ""
                    }, 3000)
                } else {}
            })
        });
    } else {
        disableAdminMenu();
    }
})

function enableAdminMenu() {
    console.log("admin mode enabled")
    document.querySelectorAll(".admin").forEach(function (el) {
        el.classList.remove("is-hidden")
    })
}

function disableAdminMenu() {
    console.log("admin mode disabled")
    document.querySelectorAll(".admin").forEach(function (el) {
        el.classList.add("is-hidden")
    })
}

var cartItems = [];
// auth.onAuthStateChanged(loadCart());

function addToCart(doc) {
    var div = document.getElementById("cartList");
    // var cat,name,price,desc,img,avail;
    db.collection("items").doc(doc).get().then(function (data) {
        renderCartItem(data.data());
        cartItems.push(data.data());
        db.collection("carts").doc(auth.currentUser.uid).set({
            cart: cartItems
        })
    })
    // div.innerHTML += "<div class='tile is-child box is-4'>  <p class='title'>" + name + "</p>  <p class='subtitle'>" + price + "</p>  <p class='subtitle'>" + desc + "</p>  <p class='subtitle'>" + cat + "</p>  <figure class='image is-4by3'>    <img src='" + img + "'>  </figure> <button class='button m-2 has-background-success'>Add to Cart</button></div>"
}

function clearCart() {
    //TODO: delete from cart
    var div = document.getElementById("cartList");
    div.innerHTML = "";
    document.getElementById("Total").innerText = 0;
    document.getElementById("TotalCheckout").innerText = 0.00;
    document.getElementById("checkoutCartList").innerHTML = "";
    cartItems = [];
    db.collection("carts").doc(auth.currentUser.uid).set({
        cart: cartItems
    })
}


function renderCartItem(data) {
    console.log(data)
    var div = document.getElementById("cartList");
    div.innerHTML += "<div class='lineItem'>  <li>" + data.name + "</li></div>"
    curPrice = document.getElementById("Total").innerText;
    curPrice = parseFloat(curPrice);
    curPrice += parseFloat(data.price);
    document.getElementById("Total").innerText = curPrice;
    document.getElementById("TotalCheckout").innerText = curPrice;
    document.getElementById("checkoutCartList").innerHTML += "<div class='lineItem'>  <li>" + data.name;
}

function loadCart() {
    console.log("Loading Cart");
    getUidAsync().then((uid) => {
        console.log(uid)
        db.collection("carts").doc(uid).get().then(function (data) {
            console.log(data.data())
            var cart = data.data().cart;
            console.log(cart)
            cart.forEach(function (item) {
                cartItems.push(item);
                renderCartItem(item);
            })
        })
    })
}

// db.collection("items").add({
    
//         "available": true,
//         "category": "Appetizers",
//         "description": "TODO",
//         "image": "https://firebasestorage.googleapis.com/v0/b/sugar-and-lime.appspot.com/o/Appetizers%2FFruit%20Tart.jpeg?alt=media&token=c031d65a-66c7-4be4-aba1-e97300394f8b",
//         "name": "Fruit Tart",
//         "options": [],
//         "price": 4.99
    
// })


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

async function getUidAsync() {
    while (auth.currentUser == null) {
        await new Promise(r => setTimeout(r, 500));
    }
    return auth.currentUser.uid;
}
loadCart();

document.getElementById("CheckoutButtonCart").addEventListener('click', function () {
    document.getElementById("checkoutModal").classList.add('is-active');
    if (!auth.currentUser) {
        document.getElementById("checkoutModal").classList.remove('is-active');
        document.getElementById("notifications").innerHTML += "<div class='notification is-danger'>Please login to checkout</div>"
    }
});

document.getElementById("PlaceOrderBtn").addEventListener('click', function () {
    console.log("Placing Order");
    var name = document.getElementById("checkoutName").value;
    var email = document.getElementById("checkoutEmail").value;
    var phone = document.getElementById("checkoutPhone").value;
    var specialNotes = document.getElementById("checkoutSpecialNotes").value;

    if (name == "" || email == "" || phone == "") {
        document.getElementById("notifications").innerHTML += "<div class='notification is-danger'>Please fill in all fields</div>"
        return;
    }

    db.collection("orders").add({
        name: name,
        email: email,
        phone: phone,
        items: cartItems,
        specialNotes: specialNotes

    }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("notifications").innerHTML += "<div class='notification is-success'>Order Placed, Order Num: " + docRef.id + "</div>"
        document.getElementById("checkoutModal").classList.remove('is-active');
    });
    clearCart();
});

document.getElementById("CancelOrderBtn").addEventListener('click', function () {
    console.log("Order Cancelled");
    document.getElementById("checkoutModal").classList.remove('is-active');
});