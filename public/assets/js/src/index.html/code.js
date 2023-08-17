regEx = /[A-Z]+[0-9]/g


async function checkCode(code) {
    if (code.length !== 6) {
        return false;
    }
    var qSnap = await db.collection('dispensers').where('code', '==', code).get()

    if (qSnap.size == 0) {
        return false;
    }

    console.log(qSnap.docs[0])

    document.getElementById("m-code").style.borderBottomColor = "lightgreen";
    navigator.vibrate(20);
    window.location.href = `/buy?dispenser_id=${qSnap.docs[0].id}`

}

document.getElementById("m-code").addEventListener('keyup', (e) => {
    checkCode(document.getElementById("m-code").value)
})