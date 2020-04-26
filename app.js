const operation = getOperation();
let quantityOperands = getQuantityOfOperands();
const operands = getValueOperands();
showToScreen(operation);

// Cпрашиваем у пользователя какую операцию он хочет выполнить.
function getOperation() {
  let answerUser;

  do {
    answerUser = prompt(`Введите какое математическое действие вы хотите выплнить:
    + - сложение.
    - - вычетание.
    * - умножение.
    / - деление.
    `);
  } while (!correctValue(answerUser));

  return answerUser;
}
/*
 Проверяем, что операция который ввел пользователь нам подходит.
Ecли ввел нужное значение, то функция возвращает его, если нет то undenfiend...
*/
function correctValue(value) {
  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
      return value;
  }
}
// Спрашиваем у пользователя кол-во операндов.
function getQuantityOfOperands() {
  let answerUser;
  do {
    answerUser = +prompt(`Какое кол-во операндов вы хотите использовать?`);
    if (answerUser > 1) {
      return answerUser;
    }
  } while (true);
}

// Cпрашиваем у пользователя каждый операнд.
function getValueOperands() {
  const operands = [];
  do {
    operand = prompt(`Введите значение ${operands.length + 1}-го операнда`);
  } while (typeCheckOfNumbers(operand));

  /*
Проверяем . что вернул в ответе пользователь, и если нужный нам тип то уменьшаем кол-во операндов
и заносим их в массив.
P.s Функцию создал здесь т.к. хотел замкнуть массив.
*/
  function typeCheckOfNumbers(value) {
    // Проверяем если пользователь ничего не ввел и нажал OK или Отмена. Т.к. при привединии типов '' и null == 0;
    switch (value) {
      case "":
      case null:
        return quantityOperands;
    }

    //   Приводим к числу значение
    value = Number(value);

    //  Проверяем если это число - уменьшаем кол-во операндов;
    switch (isNaN(value)) {
      case true:
        return quantityOperands;
    }

    // Проверяем, можно делить на 0 или нет.
    if (operation === "/" && operands.length > 0 && value === 0) {
      alert("На 0 делить нельзя! Введите значение >0 || <0");
      return quantityOperands;
    }

    operands.push(value);

    return --quantityOperands;
  }

  return operands;
}

// Отображаем овтет пользователю
function showToScreen(action) {
  switch (action) {
    case "+":
      sum(operands);
      break;
    case "-":
      min(operands);
      break;
    case "*":
      mult(operands);
      break;
    case "/":
      div(operands);
      break;
  }
}

function sum(values) {
  let result = values[0];
  let str = "";

  for (let i = 1; i < values.length; i++) {
    result += values[i];
    str += ` + ${values[i]}`;
  }

  alert(values[0] + `${str} = ${result}`);
  return result;
}

function min(values) {
  let result = values[0];
  let str = "";

  for (let i = 1; i < values.length; i++) {
    result -= values[i];
    str += ` - ${values[i]}`;
  }

  alert(values[0] + `${str} = ${result}`);
  return result;
}

function mult(values) {
  let result = values[0];
  let str = "";

  for (let i = 1; i < values.length; i++) {
    result *= values[i];
    str += ` * ${values[i]}`;
  }

  alert(values[0] + `${str} = ${result}`);
  return result;
}

function div(values) {
  let result = values[0];
  let str = "";

  for (let i = 1; i < values.length; i++) {
    result /= values[i];
    str += ` / ${values[i]}`;
  }

  result = Number(result.toFixed(2));

  alert(values[0] + `${str} = ${result}`);
  return result;
}
