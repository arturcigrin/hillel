const operation = prompt(
  `Введите какое математическое действие хотите выполнить: 
  + - сложение.
  -  - вычетание.
  * - умножение.
  / - деление.
  ** - возведение в степень.
  max - найти максимальное число.
  `
);

const firstNumber = +prompt("Введите первое число.");
const secondNumber = +prompt("Введите второе число.");

switch (operation) {
  case "+":
    additionOfNumbers(firstNumber, secondNumber);
    break;
  case "-":
    subtractionOfNumbers(firstNumber, secondNumber);
    break;
  case "*":
    multiplicationOfNumbers(firstNumber, secondNumber);
    break;
  case "/":
    divisionOfNumbers(firstNumber, secondNumber);
    break;
  case "**":
    powOfNumbers(firstNumber, secondNumber);
    break;
  case "max":
    maxOfNumbers(firstNumber, secondNumber);
    break;
  default:
    alert("С таким оператором нет действия.");
}

function additionOfNumbers(a, b) {
  const result = a + b;
  alert(`Результат: ${a} + ${b} = ${result}`);
  return result;
}

function subtractionOfNumbers(a, b) {
  const result = a - b;
  alert(`Результат: ${a} - ${b} = ${result}`);
  return result;
}

function multiplicationOfNumbers(a, b) {
  const result = a * b;
  alert(`Результат: ${a} * ${b} = ${result}`);
  return result;
}

function divisionOfNumbers(a, b) {
  if (!b) {
    return alert("На 0 делить нельзя!");
  }
  let result = a / b;
  result = Number(result.toFixed(3));

  alert(`Результат: ${a} / ${b} = ${result}`);
  return result;
}

function powOfNumbers(a, b) {
  const result = Math.pow(a, b);
  alert(`Результат: ${a} ** ${b} = ${result}`);
  return result;
}

function maxOfNumbers(a, b) {
  const result = Math.max(a, b);
  alert(`Максимальное число: ${result}`);
  return result;
}
