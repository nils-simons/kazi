const d = document;

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

if (!type || type == 'qr') {
    d.getElementById('sec-qr').style.display = 'block';
}

if (type == 'code') {
    d.getElementById('sec-code').style.display = 'block';
}


d.getElementById('code-opt').addEventListener('click', (e) => {
    d.getElementById('sec-qr').style.display = 'none';
    d.getElementById('sec-code').style.display = 'block';
});


d.getElementById('qr-opt').addEventListener('click', (e) => {
    d.getElementById('sec-qr').style.display = 'block';
    d.getElementById('sec-code').style.display = 'none';
});

async function checkCode(code) {
    if (code.length !== 6) {
        return false;
    }
    var qSnap = await db.collection('dispensers').where('code', '==', code).get();

    if (qSnap.size == 0) {
        alert('Dispenser not found!');
        return false;
    }

    console.log(qSnap.docs[0])

    try {
        navigator.vibrate(20);
    } catch (error) { }

    window.location.href = `/buy?dispenser_id=${qSnap.docs[0].id}`
}