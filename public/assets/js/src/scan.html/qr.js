const qrScanner = new QrScanner(
    d.getElementById('cam'),
    result => checkQr(result),
    {
        highlightScanRegion: true,
        highlightCodeOutline: true
    }
);

qrScanner.start()

function checkQr(res) {
    checkCode(res.data)
}