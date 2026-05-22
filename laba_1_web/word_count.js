const textInput = document.querySelector('.js-text-input');
const wordCountDisplay = document.querySelector('.js-word-count');

textInput.addEventListener('input', () => {
    const text = textInput.value.trim();

    if (text === '') {
        wordCountDisplay.textContent = '0';
        return;
    }

    const wordsArray = text.split(/\s+/);
    wordCountDisplay.textContent = wordsArray.length;
});