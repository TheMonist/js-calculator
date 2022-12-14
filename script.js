let currentNum = "";
let previousNum = "";
let operator = ""; 

const currentCalc = document.querySelector('.calcCurrent');
const previousCalc = document.querySelector('.calcPrevious');
const clearAll = document.querySelector('.clear');
const clear = document.querySelector('.delete');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal')
const numberButtons = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operator')

equal.addEventListener('click', () => {
    if (currentNum != "" && previousNum != "") {
        operate();
        previousCalc.textContent = "";
        currentCalc.textContent = previousNum;
    }
});

numberButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

window.addEventListener('keydown', keyBoard);

clear.addEventListener('click', handleDelete);

clearAll.addEventListener('click', clearCalc);

operators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});

decimal.addEventListener('click', addDecimal);


function clearCalc() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentCalc.textContent = "";
    previousCalc.textContent = "";
}

function handleNumber(number) {
    if (previousNum != "" && currentNum === "" && operator === "") {
        previousNum = "";
        currentCalc.textContent = currentNum;
    }
    if (currentNum.length <= 11){
        currentNum += number;
        currentCalc.textContent = currentNum;
    }
}

function handleOperator (op) {
    if (previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op)
    } else if(currentNum === "") {
        operatorCheck(op);
    } else {
        operate();
        operator = op;
        currentCalc.textContent = "0";
        previousCalc.textContent = previousNum + " " + operator;
        currentCalc.textContent = "";
    }
}

function operatorCheck(text) {
    operator = text;
    previousCalc.textContent = previousNum + " " + operator;
    currentCalc.textContent = "0";
    currentNum = "";
}

function operate() {
   previousNum = Number(previousNum);
   currentNum = Number(currentNum);

  if (operator === "x"){
    previousNum = previousNum * currentNum;
  } else if (operator === "??") {
    if (currentNum <= 0) {
        previousNum = "Error";
        previousCalc.textContent = "";
        currentCalc.textContent = currentNum;
        operator = "";
        displayResults();
        return;
    }
    previousNum = previousNum / currentNum;
  } else if (operator === "+") {
    previousNum = previousNum + currentNum; 
  }
  else if (operator === "-") {
    previousNum = previousNum - currentNum;
  }

  previousNum = roundNum(previousNum);
  previousNum = previousNum.toString();
  displayResults();
}

function roundNum(num) {
    return Math.round(num * 100000) / 100000;
}

function displayResults() {
    if (previousNum.length <= 11) {
        currentCalc.textContent = previousNum;
    } else {
        currentCalc.textContent = previousNum.slice(0, 11) + "...";
    }
    previousCalc.textContent = "";
    operator = "";
    currentNum = "";
}

function addDecimal() {
    if (!currentNum.includes('.')) {
        currentNum += ".";
        currentCalc.textContent = currentNum;
    }
}

function handleDelete() {
    if (currentNum != "") {
        currentNum = currentNum.slice(0, -1);
        currentCalc.textContent = currentNum;
        if (currentNum === "") {
            currentNum = "0";
        }
    }
    if (currentNum === "" && previousNum != "" && operator === "") {
        previousNum = previousNum.slice(0, -1);
        currentCalc.textContent = previousNum;
    }
}

function keyBoard(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key)
    }
    if (
        e.key === 'Enter' || 
        (e.key === "" && currentNum != "" && previousNum != "")
        ) {
        operate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleOperator(e.key);
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === "."){
        handleDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}