const inputC = document.getElementById('input-c');
const checkBtn = document.getElementById('check-btn');
const resultDisplay = document.getElementById('result-display');

function isSquareSum(c) {
    let a = 0;
    let b = Math.floor(Math.sqrt(c)); 

    while (a <= b) {
        let sum = a * a + b * b;
        
        if (sum === c)
            return { exists: true, a: a, b: b };
        else if (sum < c)
            a++;
        else            
            b--;
    }
    
    return { exists: false };
}

checkBtn.addEventListener('click', () => {
    const c = parseInt(inputC.value);
    if (isNaN(c) || c < 0) {
        resultDisplay.innerHTML = `<span style="color: #ef4444;">Введіть додатнє ціле число</span>`;
        return;
    }

    const result = isSquareSum(c);

    if (result.exists) {
        resultDisplay.innerHTML = `
            a = ${result.a} <br> b = ${result.b}
        `;
    } else {
        resultDisplay.innerHTML = `
            <span class="result__value" style="color: #ef4444;">Не існує таких a і b</span><br>
        `;
    }
});