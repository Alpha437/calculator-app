const numbers = document.querySelectorAll('.number');
const calcScreen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator');
const deleteBtn = document.querySelector('.del');
const resetBtn = document.querySelector('.reset');
const themes = document.querySelectorAll("[name='theme']");

function storeTheme(theme) {
  localStorage.setItem('theme', theme);
}

function loadTheme(theme) {
  const activeTheme = localStorage.getItem('theme');
  themes.forEach((theme) => {
    if (theme.id === activeTheme) {
      theme.checked = true;
    }
  });
}

calcScreen.textContent = '';
let operator = false;
function displayNumber(operator = false) {
  if (operator) {
    calcScreen.textContent = '';
  }
  let clickedNumber = this.textContent;
  if (this.textContent === '0' && calcScreen.textContent === '0') {
    calcScreen.textContent = '0';
  } else if (calcScreen.textContent === '0' && this.textContent != '0') {
    calcScreen.textContent = this.textContent;
  } else if (calcScreen.textContent === '0' && this.textContent === '.') {
    calcScreen.textContent += this.textContent;
  } else if (calcScreen.textContent.includes('.')) {
    calcScreen.textContent += this.textContent;
  } else if (calcScreen.textContent === '' && this.textContent === '.') {
    calcScreen.textContent = '';
  } else if (calcScreen.textContent.length === 25) {
    calcScreen.textContent = calcScreen.textContent;
  } else {
    calcScreen.textContent +=
      calcScreen.textContent.length > 1 &&
      calcScreen.textContent.split(',').join('').length % 3 == 0
        ? `,${clickedNumber}`
        : clickedNumber;
  }
}

let operands = [];
let operation = 0;
function performOperation() {
  const sign = this.textContent;
  let str = calcScreen.textContent.includes(',')
    ? calcScreen.textContent.split(',').join('')
    : calcScreen.textContent;
  if (!operator) {
    operands.push(str);
  }
  operator = true;

  if (operands.length >= 3 && !isNaN(Number(operands[operands.length - 1]))) {
    operation = eval(operands.join(''));
    calcScreen.textContent = operation;
  } else if (
    operands.length >= 2 &&
    isNaN(Number(operands[operands.length - 1]))
  ) {
    operands.pop();
  }

  if (sign === '=') {
    operation = eval(operands.join(''));
    calcScreen.textContent = operation;
  } else if (sign === 'x') {
    operation = eval(operands.join(''));
    operands = [];
    operands.push(operation);
    operands.push('*');
  } else if (sign === '/') {
    operation = eval(operands.join(''));
    operands = [];
    operands.push(operation);
    operands.push(sign);
  } else {
    operands.push(sign);
  }
}

function reset() {
  operation = 0;
  operands = [];
}

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    displayNumber.call(number, operator);
    if (operator) {
      operator = !operator;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    performOperation.call(operator);
  });
});

deleteBtn.addEventListener('click', () => {
  if (calcScreen.textContent) {
    let newStr = calcScreen.textContent.substring(
      0,
      calcScreen.textContent.length - 1
    );
    newStr.endsWith(',')
      ? (newStr = newStr.substring(0, newStr.length - 1))
      : newStr;
    calcScreen.textContent = newStr;
  }
});

resetBtn.addEventListener('click', () => {
  calcScreen.textContent = '';
  reset();
});

themes.forEach(theme => {
  theme.addEventListener('click', () => storeTheme(theme.id));
});

window.onload = loadTheme;