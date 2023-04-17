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
}