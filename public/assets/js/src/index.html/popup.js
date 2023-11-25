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