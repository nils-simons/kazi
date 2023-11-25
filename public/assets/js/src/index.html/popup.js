const shadow = d.getElementById('shadow-overlay')
const content = d.getElementById('content-overlay')

function openPopup() {
    shadow.style.display = 'block';
    content.style.display = 'block';
}

function closePopup() {
    shadow.style.display = 'none';
    content.style.display = 'none';
}

shadow.addEventListener('click', (e) => {
    closePopup()
})

d.getElementById('ham-menu').addEventListener('click', (e) => {
    openPopup()
})


d.getElementById('logout').addEventListener('click', (e) => {
    e.target.textContent = '...';
    firebase.auth().signOut()
});



auth.onAuthStateChanged((user) => {
    if (user) {
        d.getElementById('pp-name').textContent = auth.currentUser.displayName
        d.getElementById('pp-img').src = auth.currentUser.photoURL
    }
});