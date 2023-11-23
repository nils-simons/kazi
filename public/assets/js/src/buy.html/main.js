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
})