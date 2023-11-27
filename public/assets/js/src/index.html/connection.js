async function checkConnection() {
    var resp = await fetch('http://kazi.nilssimons.me/')
    if (!resp.ok) {
        document.getElementById('no-connection').style.display = 'flex';
    } else {
        document.getElementById('no-connection').style.display = 'none';
    }
}