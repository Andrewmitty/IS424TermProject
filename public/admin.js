db.collection("orders").get().then(function (data) {
    data.forEach(function (doc) {
        renderOrder(doc);
    })
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
      </div>"
}