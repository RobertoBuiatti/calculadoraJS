const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');

let firstNumber = null;
let secondNumber = null;
let operator = null;
let result = null;

numbers.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === null) {
            firstNumber = (firstNumber === null) ? button.value : firstNumber + button.value;
            display.textContent = firstNumber;
        } else {
            secondNumber = (secondNumber === null) ? button.value : secondNumber + button.value;
            display.textContent = firstNumber + operator + secondNumber;
        }
    });
});

operators.forEach((button) => {
    button.addEventListener('click', () => {
        if (firstNumber !== null && operator === null) {
            operator = button.value;
            display.textContent = firstNumber + operator;
        }
    });
});

decimalButton.addEventListener('click', () => {
    if (operator === null) {
        if (firstNumber === null) {
            firstNumber = '0.';
            display.textContent = firstNumber;
        } else if (!firstNumber.includes('.')) {
            firstNumber += '.';
            display.textContent = firstNumber;
        }
    } else {
        if (secondNumber === null) {
            secondNumber = '0.';
            display.textContent = secondNumber;
        } else if (!secondNumber.includes('.')) {
            secondNumber += '.';
            display.textContent = secondNumber;
        }
    }
});

clearButton.addEventListener('click', () => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    result = null;
    display.textContent = '';
});

equalsButton.addEventListener('click', () => {
    if (firstNumber !== null && operator !== null && secondNumber !== null) {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);
        calculateResult(num1, num2);
    }
}
);


function updateDisplay(value) {
    document.getElementById('display').value = value;
}


function clearCalculator() {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    result = null;
    updateDisplay('');
}


function addDigit(digit) {
    if (result !== null) {

        firstNumber = result;
        secondNumber = digit;
        result = firstNumber + secondNumber;
        updateDisplay(result);
    }

    if (operator === null) {

        if (firstNumber === null) {
            firstNumber = digit;
        } else {
            firstNumber += digit;
        }
        updateDisplay(firstNumber);
    } else {

        if (secondNumber === null) {
            secondNumber = digit;
        } else {
            secondNumber += digit;
        }
        updateDisplay(secondNumber);
    }
}


function setOperator(op) {
    if (result !== null) {

        firstNumber = result;
        secondNumber = null;
        result = null;
    }
    operator = op;
}


function calculateResult(digit1, digit2) {
    switch (operator) {
        case '+':
            result = digit1 + digit2;
            break;
        case '-':
            result = digit1 - digit2;
            break;
        case '*':
            result = digit1 * digit2;
            break;
        case '/':
            result = digit1 / digit2;
            break;
        default:
            result = null;
    }
    display.textContent = result;
    firstNumber = result;
    secondNumber = null;
}

