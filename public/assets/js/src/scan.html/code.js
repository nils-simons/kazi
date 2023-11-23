function handleInput(nextIndex) {
    const currentInput = document.activeElement;
    // Check if the input value is a number
    if (!isNaN(currentInput.value) && currentInput.value !== '') {
        // Move focus to the next input
        const nextInput = document.querySelector('.uid-input:nth-child(' + (nextIndex + 1) + ')');
        if (nextInput) {
            nextInput.focus();
        }
    }
}

d.getElementById('last-input-code').addEventListener('keyup', (e) => {    
    var codeL = Array.from(d.getElementsByClassName('uid-input'));

    var fullCode = '';
    for (let i = 0; i < codeL.length; i++) {
        const ccd = codeL[i];
        var fullCode = fullCode + ccd.value;
    }
    checkCode(fullCode)
})