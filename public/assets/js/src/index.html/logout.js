document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        alert('error login out')
    });
})