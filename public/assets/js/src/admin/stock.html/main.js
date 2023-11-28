const d = document;

const urlParams = new URLSearchParams(window.location.search);
const dis_id = urlParams.get('dis_id')


let C_DIS = undefined;

db.collection('dispensers').doc(dis_id).get()
.then((doc) => {
    var data = doc.data();
    C_DIS = data
    d.getElementById('c-stock').textContent = data.product.stock
})


d.getElementById('btn-set').addEventListener('click', async (e) => {
    if (!C_DIS) {
        alert('Please wait while data is being loaded!')
        return false
    }
    e.target.textContent = '...'
    e.target.disabled = true;

    var uptData = C_DIS
    uptData.product.stock = parseInt(d.getElementById('stock-input').value)
    await db.collection('dispensers').doc(dis_id).update(uptData)
    e.target.textContent = 'SET'
    e.target.disabled = false;

    d.getElementById('c-stock').textContent = parseInt(d.getElementById('stock-input').value)
})