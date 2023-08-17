const qrScanner = new QrScanner(
    document.getElementById('qr-cam'),
    result => checkCode(result.data),
    {
        highlightScanRegion: true,
        highlightCodeOutline: true
    }
);
qrScanner.start();