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