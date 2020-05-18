const firstArgument = document.querySelector('#firstArgument');
const secondArgument = document.querySelector('#secondArgument');
const operations = document.querySelector('#operations')
const btnCalculate = document.querySelector('#calculate');
const blockResult = document.querySelector('.result');

btnCalculate.addEventListener("click", onCalculate);

function onCalculate(event) {
  event.preventDefault();
  const listArguments = getValueInputs(firstArgument, secondArgument);
  const userAction = getUserAction(operations);

  clearInput(firstArgument, secondArgument);

  chekWhatToShow(listArguments, userAction) ?
    showResult(blockResult, listArguments, userAction) :
    showMessageError(blockResult);
}

function getValueInputs(firstInput, secondInput) {
  return filterAndCheckValues(firstInput.value, secondInput.value);
}

function filterAndCheckValues(...listValues) {
  return listValues.filter(value => !isNaN(value) && value.trim()).map(number => +number);
}

function getUserAction(selectElement) {
  return selectElement.value;
}

function getResult(operation, arrayValues) {
  switch (operation) {
    case '+':
      return sum(arrayValues);
    case '-':
      return sub(arrayValues);
    case '*':
      return mult(arrayValues);
    case '/':
      return div(arrayValues);
    case 'min':
      return min(arrayValues);
    case 'max':
      return max(arrayValues);
  }
}

function showResult(elementResult, arrayArguments, operationSelectedByUser) {

  const result = getResult(operationSelectedByUser, arrayArguments);

  elementResult.innerText = `Результат: ${result}`;

  if (elementResult.classList.contains('hidden')) {
    elementResult.classList.remove('hidden');
  }
}

function showMessageError(elementResult) {
  elementResult.innerText = 'Ошибка: вы не ввели число или поделили на ноль';

  if (elementResult.classList.contains('hidden')) {
    elementResult.classList.remove('hidden');
  }
}

function clearInput(...inputs) {
  inputs.forEach(input => input.value = '');
}

function checkDivisionByZero(secondArgument, operation) {
  return operation === '/' && secondArgument === 0 ? false : true;
}

function chekWhatToShow(arrayArguments, operationSelectedByUser) {
  return checkDivisionByZero(arrayArguments[1], operationSelectedByUser) && arrayArguments.length > 1 ? true : false;
}

function sum(listArguments) {
  return listArguments.reduce((result, value) => result += value);
}

function sub(listArguments) {
  return listArguments.reduce((result, value) => result -= value);
}

function mult(listArguments) {
  return listArguments.reduce((result, value) => result *= value);
}

function div(listArguments) {
  return listArguments.reduce((result, value) => result /= value);
}

function min(listArguments) {
  return Math.min(...listArguments);
}

function max(listArguments) {
  return Math.max(...listArguments);
}