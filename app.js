const operation = getOperation();
let quantityOperands = getQuantityOfOperands();
const operands = getValueOperands();
showToScreen(operation);

function getOperation() {
  let answerUser;

  do {
    answerUser = prompt(`Введите какое математическое действие вы хотите выплнить:
    + - сложение.
    - - вычетание.
    * - умножение.
    / - деление.
    `);
  } while (!correctOperation(answerUser));

  return answerUser;
}

function correctOperation(actionSelectedByUser) {
  return (
    actionSelectedByUser === "+" ||
    actionSelectedByUser === "-" ||
    actionSelectedByUser === "*" ||
    actionSelectedByUser === "/"
  );
}

function getQuantityOfOperands() {
  let answerUser;

  do {
    answerUser = +prompt(`Какое кол-во операндов вы хотите использовать?`);

    if (answerUser > 1) {
      return answerUser;
    }
  } while (true);
}

function getValueOperands() {
  let userAnswer, valueOfOperands;

  do {
    userAnswer = prompt("Введите  значения через пробел.");
    valueOfOperands = typeCheckOfNumbers(userAnswer);
  } while (!valueOfOperands);

  return valueOfOperands;
}

function typeCheckOfNumbers(numbersEnteredByUser) {
  if (!numbersEnteredByUser) {
    alert("Введите значения");
    return false;
  }

  let arrOperands = numbersEnteredByUser.split(" ")
    .filter(isNumber => +isNumber || +isNumber === 0)
    .map(number => +number);

  return divisionByZero(operation, arrOperands) && checkQuantityOperands(arrOperands, quantityOperands);
}

function checkQuantityOperands(arrNumbers, quantityNumbers) {
  if (arrNumbers.length !== quantityNumbers) {
    alert(`Вы ввели неверное количество чисел. Вам нужно ввести ${quantityNumbers}`);
    return false;
  }

  return arrNumbers;
}

function divisionByZero(actionUser, arrayValues) {
  const zeroValues = arrayValues.slice(1).filter(values => !values);

  if (actionUser === "/" && zeroValues.length) {
    alert("На 0 делить нельзя");
    return false;
  }

  return true;
}

function showToScreen(actionUser) {
  switch (actionUser) {
    case "+":
      sum(operands);
      break;
    case "-":
      sub(operands);
      break;
    case "*":
      mult(operands);
      break;
    case "/":
      div(operands);
      break;
  }
}

function sum(arrayValues) {
  let strValue = arrayValues[0];

  const result = arrayValues.reduce((acum, value) => {
    strValue += ` + ${value}`;
    return acum += value;
  });

  alert(`${strValue} = ${result}`);
  return result;
}

function sub(arrayValues) {
  let strValue = arrayValues[0];

  const result = arrayValues.reduce((acum, value) => {
    strValue += ` - ${value}`;
    return acum -= value;
  });

  alert(`${strValue} = ${result}`);
  return result;
}

function mult(arrayValues) {
  let strValue = arrayValues[0];

  const result = arrayValues.reduce((acum, value) => {
    strValue += ` * ${value}`;
    return acum *= value;
  });

  alert(`${strValue} = ${result}`);
  return result;
}

function div(arrayValues) {
  let strValue = arrayValues[0];

  const result = arrayValues.reduce((acum, value) => {
    strValue += ` / ${value}`;
    return acum /= value;
  });

  alert(`${strValue} = ${result}`);
  return result;
}