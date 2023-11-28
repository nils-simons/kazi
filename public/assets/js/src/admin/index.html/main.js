const d = document
const selDis = d.getElementById('sel-dis');

const ctaCalib = d.getElementById('cta-calib');
const ctaStock = d.getElementById('cta-stock');

d.addEventListener('DOMContentLoaded', async (e) => {
    var snap = await db.collection('dispensers').get();
    selDis.innerHTML = ''
    snap.forEach((doc) => {
        var data = doc.data();
        selDis.innerHTML += `
        <option value="${doc.id}">#${data.code}</option>
        `
    });
    ctaCalib.href = ctaCalib.href+'?dis_id=' +snap.docs[0].id
    ctaStock.href = ctaStock.href+'?dis_id=' +snap.docs[0].id

    d.getElementById('cta-container').style.display = 'grid'
})


