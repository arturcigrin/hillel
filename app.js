const btnAddTask = document.querySelector("#formTask button");
const inputFormTask = document.querySelector("#formTask input");
const todoList = document.querySelector("#todoList");
let countTask = 1;

inputFormTask.addEventListener("input", validationInput);
btnAddTask.addEventListener("click", onAddTask);

function onAddTask(event) {
  event.preventDefault();

  const valueInput = getValueInput(inputFormTask);
  const li = createElementLi(valueInput);
  renderTask(todoList, li);
}

function getValueInput(inputElement) {
  const value = inputElement.value;
  inputElement.value = "";
  validationInput.call(inputElement);
  return value;
}

function createElementLi(textTask) {
  const li = document.createElement("li");
  li.innerText = `${countTask++} ${textTask}`;

  return li;
}

function renderTask(containerTasks, task) {
  containerTasks.append(task);
}

function validationInput() {
  this.value.trim() ? btnAddTask.disabled = "" : btnAddTask.disabled = true;
}