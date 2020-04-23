const operation = prompt(
  `Введите какое математическое действие хотите выполнить: 
  + - сложение.
  -  - вычетание.
  * - умножение.
  / - деление.
  ** - возведение в степень.
  max - найти максимальное число.
  cos - найти косинус числа.
  sin - найти синус числа.
  tan - найти тангенс числа.
 `
);

if (operation === "cos" || operation === "sin" || operation === "tan") {
  const number = +prompt("Введите число.");

  switch (operation) {
    case "cos":
      cosOfNumber(number);
      break;
    case "sin":
      sinOfNumber(number);
      break;
    case "tan":
      tanOfNumber(number);
  }
} else {
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

function cosOfNumber(a) {
  const result = Math.cos(a);
  alert(`Косинус числа ${a} равен ${result}`);
  return result;
}

function sinOfNumber(a) {
  const result = Math.sin(a);
  alert(`Синус числа ${a} равен ${result}`);
  return result;
}

function tanOfNumber(a) {
  const result = Math.tan(a);
  alert(`Тангенс числа ${a} равен ${result}`);
  return result;
}