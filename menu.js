db.collection('items').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderMenu(doc);
    })
});


function renderMenu(doc) {
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
    div.innerHTML += "<div class='tile is-child box is-4'>  <p class='title'>" + name + "</p>  <p class='subtitle'>" + price + "</p>  <p class='subtitle'>" + desc + "</p>  <p class='subtitle'>" + cat + "</p>  <figure class='image is-4by3'>    <img src='" + img + "'>  </figure> <button class='button m-2 has-background-success' onClick=addToCart('" + doc.id + "')>Add to Cart</button></div>"
}

function addToCart(doc) {
    var div = document.getElementById("cartList");
    // var cat,name,price,desc,img,avail;
    db.collection("items").doc(doc).get().then(function (data) {

        div.innerHTML += "<div class='lineItem'>  <li>" + data.data().name + "<button class='delete has-background-danger'></li></div>"
        curPrice = document.getElementById("Total").innerText;
        curPrice = parseFloat(curPrice);
        curPrice += parseFloat(data.data().price);
        document.getElementById("Total").innerText = curPrice;
    })

    // div.innerHTML += "<div class='tile is-child box is-4'>  <p class='title'>" + name + "</p>  <p class='subtitle'>" + price + "</p>  <p class='subtitle'>" + desc + "</p>  <p class='subtitle'>" + cat + "</p>  <figure class='image is-4by3'>    <img src='" + img + "'>  </figure> <button class='button m-2 has-background-success'>Add to Cart</button></div>"
}