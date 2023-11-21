const numbers = document.querySelectorAll('.number');
const calcScreen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator');
const deleteBtn = document.querySelector('.del');
const resetBtn = document.querySelector('.reset');

// Destructuring
const [plusBtn, subBtn, divBtn, mulBtn] = operators;

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
  } else {
    calcScreen.textContent +=
      calcScreen.textContent.length > 1 &&
      calcScreen.textContent.split(',').join('').length % 3 == 0
        ? `,${clickedNumber}`
        : clickedNumber;
  }
}


let calcSign;

function performOperation() {
  let calcSign = this.textContent;
  operator = true;
  let str = calcScreen.textContent.includes(',')
    ? calcScreen.textContent.split(',').join('')
    : calcScreen.textContent;
  let number = Number(str);

  switch (calcSign) {
    case '+':
      break;
    case '/':
      break;
    case '-':
      break;
    case '=':
      break;
  }
}

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    displayNumber.call(number, operator);
    operator = !operator;
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
  operand1 = 0;
  operation = 0;
});
