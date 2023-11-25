d.getElementById('logout').addEventListener('click', (e) => {
    e.target.textContent = '...';
    firebase.auth().signOut()
});