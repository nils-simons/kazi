const d = document;

const urlParams = new URLSearchParams(window.location.search);
let dis_id = urlParams.get('dispenser_id');
let DISPENSER_DATA = undefined;
console.log(dis_id);

if (!dis_id) {
    alert('Missing Dispenser ID');
    window.location.href = '/';
}

db.collection('dispensers').doc(dis_id).get()
.then(async (doc) => {
    if (!doc.exists) {
        alert('Invalid Dispenser ID');
        window.location.href = '/';
        return
    }
    DISPENSER_DATA = doc.data();
    DISPENSER_DATA.id = dis_id;
    loadmap();
    var res = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${DISPENSER_DATA.coords[0]},${DISPENSER_DATA.coords[1]}&langCode=fr&outSR=&forStorage=false&f=pjson`)
    var res = await res.json();
    console.log(res)
    d.getElementById('place').textContent = res.address.PlaceName

    d.getElementById('amount').innerHTML = ''
    for (let i = 0; i < DISPENSER_DATA.product.stock; i++) {
        d.getElementById('amount').innerHTML += `
        <option value="${i+1}">${i+1}</option>
        `
    }

    if (DISPENSER_DATA.product.stock < 1) {
        d.getElementById('content').style.display = 'none';
        d.getElementById('oos').style.display = 'block';
        d.getElementById('buy').disabled = true;
        d.getElementById('buy').textContent = 'Out of Stock';
    }

    d.getElementById('product').textContent = DISPENSER_DATA.product.name
    d.getElementById('price').textContent = DISPENSER_DATA.product.price.toFixed(2) + ' €'

    d.getElementById('loader').style.display = 'none';
})

d.getElementById('amount').addEventListener('change', (e) => {
    d.getElementById('price').textContent = (DISPENSER_DATA.product.price * parseInt(e.target.value)).toFixed(2) + ' €'
})