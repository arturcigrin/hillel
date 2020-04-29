const operation = getOperation();
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
  } while (!checkOperation(answerUser));

  return answerUser;
}

function checkOperation(actionSelectedByUser) {
  return (
    actionSelectedByUser === "+" ||
    actionSelectedByUser === "-" ||
    actionSelectedByUser === "*" ||
    actionSelectedByUser === "/"
  );
}

function getValueOperands() {
  let userAnswer, valueOfOperands;

  do {
    userAnswer = prompt("Введите  значения через пробел.");
    valueOfOperands = filterAndCheckType(userAnswer);
  } while (!valueOfOperands);

  return valueOfOperands;
}

function filterAndCheckType(numbersEnteredByUser) {
  if (!numbersEnteredByUser) {
    alert("Введите значения");
    return false;
  }

  let arrOperands = numbersEnteredByUser.split(" ")
    .filter(checkNumber => +checkNumber || +checkNumber === 0)
    .map(number => +number);

  return divisionByZero(operation, arrOperands);
}


function divisionByZero(actionUser, arrayValues) {
  const zeroValues = arrayValues.slice(1).filter(values => !values);

  if (actionUser === "/" && zeroValues.length) {
    alert("На 0 делить нельзя");
    return false;
  }

  return arrayValues;
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