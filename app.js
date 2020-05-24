const CLASS_TASK_COMPLETED = "completed";
const CLASS_TASK_NOT_COMPLETED = "not-completed";
const CLASS_SWITCH_BTN_ADD = "disabled";
const CLASS_HIDE_TASK = "hide";

const inputTaskEl = document.getElementById("inputTask");
const addTaskBtn = document.getElementById("addTask");
const todoListEl = document.getElementById("todoList");
const taskTemplateEl = document.getElementById("taskTemplate").innerHTML;

inputTaskEl.addEventListener("input", onChangeInput);
addTaskBtn.addEventListener("click", onClickAddBtn);
todoListEl.addEventListener("click", onClickTodoList);

isValidInput(inputTaskEl);

function onChangeInput() {
  isValidInput(this);
}

function onClickAddBtn(e) {
  e.preventDefault();

  addTask(getValueInput(inputTaskEl), taskTemplateEl, todoListEl);
  isValidInput(inputTaskEl);
}

function onClickTodoList(e) {
  checkIsTask(e.target);
  checkIsBtnDeleteTask(e.target);
}

function isValidInput(inputEl) {
  addTaskBtn.disabled = !inputEl.value.trim();
  switchClassOnBtnAdd(addTaskBtn, CLASS_SWITCH_BTN_ADD);
}

function switchClassOnBtnAdd(buttonAdd, switchClass) {
  buttonAdd.disabled
    ? buttonAdd.classList.add(switchClass)
    : buttonAdd.classList.remove(switchClass);
}

function getValueInput(inputEl) {
  return inputEl.value;
}

function clearInput(inputElement) {
  inputElement.value = "";
}

function addTask(textTask, taskEl, containerTodoList) {
  clearInput(inputTaskEl);

  containerTodoList.insertAdjacentHTML(
    "beforeend",
    taskEl.replace("{{task}}", textTask).replace("{{taskId}}", Math.random())
  );
}

function checkIsTask(targetEl) {
  if (targetEl.hasAttribute("data-taskid")) {
    switchClassOnTaskEl(
      targetEl,
      CLASS_TASK_COMPLETED,
      CLASS_TASK_NOT_COMPLETED
    );
  }
}

function switchClassOnTaskEl(
  taskEl,
  classTaskCompleted,
  classTaskNotCompleted
) {
  taskEl.classList.toggle(classTaskNotCompleted);
  taskEl.classList.toggle(classTaskCompleted);
}

function checkIsBtnDeleteTask(targetEl) {
  if (targetEl.classList.contains("delete-btn")) {
    confirmDeleteTask(targetEl.closest("[data-taskId]"));
  }
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
