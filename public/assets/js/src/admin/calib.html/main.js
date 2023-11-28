const d = document;

const urlParams = new URLSearchParams(window.location.search);
const dis_id = urlParams.get('dis_id')
const btnCalib = d.getElementById('btn-calib')

const ref = firebase.database().ref(`/${dis_id}/calib`);

ref.on('value', async (snap) => {
    const data = snap.val();
    if (data == 0) {
        btnCalib.disabled = false;
        btnCalib.textContent = 'CALIB';
    } else {
        btnCalib.disabled = true;
        btnCalib.textContent = '...';
    }
});


btnCalib.addEventListener('click', (e) => {
    firebase.database().ref(`/${dis_id}`).update({calib: parseInt(d.getElementById('calib-input').value)});
})