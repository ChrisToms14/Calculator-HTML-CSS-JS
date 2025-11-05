let display = document.getElementById('display');
let currentValue = '0';
let operator = '';
let previousValue = '';
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearDisplay() {
    currentValue = '0';
    operator = '';
    previousValue = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else if (num === '.' && currentValue.includes('.')) {
            return;
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (op === '=') {
        calculate();
        return;
    }

    const lastChar = currentValue[currentValue.length - 1];
    const operators = ['+', '-', '×', '÷'];

    if (operators.includes(lastChar)) {
        currentValue = currentValue.slice(0, -1) + op;
    } else {
        currentValue += op;
    }
    updateDisplay();
}

function deleteLastChar() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        let expression = currentValue
            .replace(/×/g, '*')
            .replace(/÷/g, '/');

        const lastChar = expression[expression.length - 1];
        if (['+', '-', '*', '/'].includes(lastChar)) {
            expression = expression.slice(0, -1);
        }

        const result = eval(expression);

        if (!isFinite(result)) {
            currentValue = 'Error';
        } else {
            currentValue = String(Math.round(result * 100000000) / 100000000);
        }
    } catch (error) {
        currentValue = 'Error';
    }

    shouldResetDisplay = true;
    updateDisplay();
}
