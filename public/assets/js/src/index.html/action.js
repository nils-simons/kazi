const d = document;

d.getElementById('qr-btn').addEventListener('click', (e) => {
    window.location.href = '/scan?type=qr';
});

d.getElementById('code-btn').addEventListener('click', (e) => {
    window.location.href = '/scan?type=code';
});