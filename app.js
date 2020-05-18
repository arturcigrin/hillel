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

function getResult(operation, listArguments) {
  switch (operation) {
    case '+':
      return sum(listArguments);
    case '-':
      return sub(listArguments);
    case '*':
      return mult(listArguments);
    case '/':
      return div(listArguments);
    case 'min':
      return min(listArguments);
    case 'max':
      return max(listArguments);
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

function sum([firstArgument, secondArgument]) {
  return firstArgument + secondArgument;
}

function sub([firstArgument, secondArgument]) {
  return firstArgument - secondArgument;
}

function mult([firstArgument, secondArgument]) {
  return firstArgument * secondArgument;
}

function div([firstArgument, secondArgument]) {
  return firstArgument / secondArgument;
}

function min(listArguments) {
  return Math.min(...listArguments);
}

function max(listArguments) {
  return Math.max(...listArguments);
}