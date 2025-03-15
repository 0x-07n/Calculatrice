let runningTotal = 0;
let buffer = '0';
let previousOperator = null;
let shouldResetBuffer = false; 

const screen = document.querySelector('.screen');
let displayBuffer = ''; // Nouvelle variable pour gérer l'affichage

function buttonClick(value) {
    if (isNaN(value) && value !== '.') {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    updateScreen();
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            resetCalculator();
            break;
        case '=':
            if (previousOperator !== null) {
                flushOperation(parseFloat(buffer)); 
                previousOperator = null;
                buffer = runningTotal.toString();
                displayBuffer = buffer; // Mise à jour de l'affichage final
                runningTotal = 0;
                shouldResetBuffer = true; 
            }
            break;
        case '←':
            buffer = buffer.length === 1 ? '0' : buffer.slice(0, -1);
            displayBuffer = buffer;
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '%':
            handlePercentage();
            break;
        case '+/-':
            toggleSign();
            break;
    }
}

function handleMath(symbol) {
    const floatBuffer = parseFloat(buffer);

    if (previousOperator !== null) {
        flushOperation(floatBuffer); 
    } else {
        runningTotal = floatBuffer;
    }

    previousOperator = symbol;
    shouldResetBuffer = true;
    
    displayBuffer = `${runningTotal} ${previousOperator}`;
    buffer = '0'; 
}

function flushOperation(floatBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += floatBuffer;
            break;
        case '−':
            runningTotal -= floatBuffer;
            break;
        case '×':
            runningTotal *= floatBuffer;
            break;
        case '÷':
            runningTotal = floatBuffer === 0 ? "Erreur" : runningTotal / floatBuffer;
            break;
    }
}

function handlePercentage() {
    if (buffer !== '0') {
        buffer = (parseFloat(buffer) / 100).toString();
        displayBuffer = buffer;
    }
}

function toggleSign() {
    if (buffer !== '0') {
        buffer = buffer.startsWith('-') ? buffer.slice(1) : '-' + buffer;
        displayBuffer = buffer;
    }
}

function handleNumber(numberString) {
    if (shouldResetBuffer) {
        buffer = numberString; 
        shouldResetBuffer = false;
    } else {
        buffer = buffer === '0' ? numberString : buffer + numberString;
    }
    
    displayBuffer = previousOperator ? `${runningTotal} ${previousOperator} ${buffer}` : buffer;
}

function resetCalculator() {
    buffer = '0';
    runningTotal = 0;
    previousOperator = null;
    displayBuffer = '0';
}

function updateScreen() {
    screen.innerText = displayBuffer;
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        if (event.target.tagName.toLowerCase() === 'button') {
            buttonClick(event.target.innerText);
        }
    });
}

init();
