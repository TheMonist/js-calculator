//buttons and other stuff

//mathematical operations
function add(a, b){
    return a + b;
}
console.log(add());

function subtract(a, b) {
    return a - b;
}
console.log(subtract());

function multiply(a, b) {
    return a * b;
}
console.log(multiply());

function divide(a, b) {
    return a / b;
}
console.log(divide());

function operate (operator, a, b) {
   a = number(a);
   b = number(b);

   switch(operator) {
    case '+':
        return add(a, b)
    case '-':
        return subtract(a, b)
    case 'x':
        return multiply(a, b)
    case '÷':
        if (b === 0) return NaN
        else return divide(a, b)
    default:
        break
   }
}