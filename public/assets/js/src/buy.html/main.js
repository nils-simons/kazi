const urlParams = new URLSearchParams(window.location.search);
let dispenser_id = urlParams.get('dispenser_id')

let prdList = document.getElementById('prd-list')


db.collection('dispensers').doc(dispenser_id).get().then((doc) => {
    var data = doc.data();
    document.getElementById('dis-name').textContent = data.name;
})


db.collection('dispensers').doc(dispenser_id).collection('products').get()
.then((snap) => {
    prdList.innerHTML = ''
    snap.forEach((doc) => {
        var data = doc.data();
        bg = ''
        if (!data.available) {
            bg = 'gray'
        }
        prdList.innerHTML += `
        <div>
            <img src="${data.img}">
            <div style="background-color: ${bg}">
                <span>${data.name} - ${data.price}€</span>
            </div>
        </div>
        `
    });
})

function buy(id) {
    
}