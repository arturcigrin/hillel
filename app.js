const CLASS_TASK_COMPLETED = "completed";
const CLASS_TASK_NOT_COMPLETED = "not-completed";
const CLASS_SWITCH_BTN_ADD = "disabled";
const CLASS_HIDE_TASK = "hide";

const inputTaskEl = document.getElementById("inputTask");
const addTaskBtn = document.getElementById("addTask");
const todoListEl = document.getElementById("todoList");
const taskTemplate = document.getElementById("taskTemplate").innerHTML;

inputTaskEl.addEventListener("input", onChangeInput);
addTaskBtn.addEventListener("click", onClickAddBtn);
todoListEl.addEventListener("click", onClickTodoList);

validationInput();

function onChangeInput() {
  validationInput();
}

function onClickAddBtn(e) {
  e.preventDefault();

  addTask();
  validationInput();
}

function onClickTodoList(e) {
  checkIsTask(e.target) ? switchClassOnTaskEl(e.target) : null;

  checkIsBtnDeleteTask(e.target)
    ? confirmDeleteTask(e.target.closest("[data-taskId]"))
    : null;
}

function validationInput() {
  addTaskBtn.disabled = !inputTaskEl.value.trim();
  switchClassOnBtnAdd();
}

function switchClassOnBtnAdd() {
  addTaskBtn.disabled
    ? addTaskBtn.classList.add(CLASS_SWITCH_BTN_ADD)
    : addTaskBtn.classList.remove(CLASS_SWITCH_BTN_ADD);
}

function getValueInput() {
  return inputTaskEl.value;
}

function clearInput() {
  inputTaskEl.value = "";
}

function addTask() {
  todoListEl.insertAdjacentHTML(
    "beforeend",
    taskTemplate
      .replace("{{task}}", getValueInput())
      .replace("{{taskId}}", Math.random())
  );

  clearInput();
}

function checkIsTask(targetEl) {
  return targetEl.hasAttribute("data-taskid");
}

function switchClassOnTaskEl(taskEl) {
  taskEl.classList.toggle(CLASS_TASK_NOT_COMPLETED);
  taskEl.classList.toggle(CLASS_TASK_COMPLETED);
}

function checkIsBtnDeleteTask(targetEl) {
  return targetEl.classList.contains("delete-btn");
}

function confirmDeleteTask(taskEl) {
  if (confirm("Вы точно хотите удалить задачу?")) {
    deleteTask(taskEl);
  }
}

function deleteTask(elementDelete) {
  elementDelete.classList.add(CLASS_HIDE_TASK);

  setTimeout(() => {
    elementDelete.remove();
  }, 400);
}
