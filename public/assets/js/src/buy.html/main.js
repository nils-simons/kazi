const urlParams = new URLSearchParams(window.location.search);
let dispenser_id = urlParams.get('dispenser_id')


db.collection('dispensers').doc(dispenser_id).get().then((doc) => {
    var data = doc.data();
    document.getElementById('dis-name').textContent = data.name;
})

function buy(id) {
    
}