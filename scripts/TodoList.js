'use strict';
$(document).ready(() => {
  const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos';
  let TASK_LIST = [];
  const ATTR_DISABLED = 'disabled';
  const ATTR_DATA_ID = 'data-id';
  const BTN_ADD_STYLE = { loading: { opacity: 0.4 }, default: { opacity: 1 } };
  const CLASS_TASK_DONE = 'task-done';
  const CLASS_BTN_DELETE = 'btn-delete';
  const CLASS_TASK = 'task';
  const XHR = new HTTPRequests();

  const $inputEl = $('#inputTask');
  const $btnAddTask = $('#addNewTask');
  const $taskList = $('#taskList');
  const $taskTemplate = $('#taskTemplate').html();

  $btnAddTask.on('click', onClickBtnAdd);
  $taskList.on('click', `.${CLASS_BTN_DELETE}`, onClickRemoveTask);
  $taskList.on('click', `.${CLASS_TASK}`, onClickUpdateTask);

  init();

  function onClickBtnAdd(e) {
    e.preventDefault();

    const inputValue = $inputEl.val().trim();

    if (!inputValue) return;

    load();
    createTask(inputValue).then(addTaskInTaskList).then(renderTaskList).then(insertTask).finally(loadEnd);

    $inputEl.val('');
  }

  function onClickRemoveTask(e) {
    e.stopPropagation();

    const $task = $(this).parent(`.${CLASS_TASK}`);
    const taskId = $task.attr(ATTR_DATA_ID);

    deleteTask(taskId)
      .then(() => $task.fadeOut(500, () => $task.remove()))
      .then(removeTaskInTaskList.bind(null, taskId));
  }

  function onClickUpdateTask(e) {
    e.stopPropagation();
    const $taskId = $(this).attr(ATTR_DATA_ID);

    $(this).toggleClass(CLASS_TASK_DONE) ? updateTask(taskFind($taskId)) : updateTask(taskFind($taskId));
  }

  function init() {
    load();
    getTasks().then(setTaskList).then(renderTaskList).then(insertTask).finally(loadEnd);
  }

  function getTasks() {
    return XHR.GET(URL);
  }

  function createTask(title) {
    return XHR.POST(URL, title);
  }

  function deleteTask(id) {
    return XHR.DELETE(URL + `/${id}`);
  }

  function updateTask(task) {
    task.isDone = !task.isDone;

    return XHR.PUT(URL + `/${task.id}`, task);
  }

  function setTaskList(taskList) {
    return (TASK_LIST = taskList);
  }

  function addTaskInTaskList(task) {
    TASK_LIST.push(task);
    return TASK_LIST;
  }

  function removeTaskInTaskList(id) {
    TASK_LIST = TASK_LIST.filter((task) => task.id != id);
  }

  function renderTaskList(taskList) {
    return $.map(taskList, (task) => createTemplate(task)).join('\n');
  }

  function createTemplate({ id, isDone, title }) {
    return isDone
      ? $taskTemplate.replace('{{id}}', id).replace('{{title}}', title).replace('{{isDone}}', CLASS_TASK_DONE)
      : $taskTemplate.replace('{{id}}', id).replace('{{title}}', title).replace('{{isDone}}', '');
  }

  function insertTask(tasks) {
    $taskList.html(tasks);
  }

  function taskFind(id) {
    return TASK_LIST.find((task) => task.id == id);
  }

  function load() {
    $btnAddTask.attr(ATTR_DISABLED, true);
    $btnAddTask.css(BTN_ADD_STYLE.loading);
  }

  function loadEnd() {
    $btnAddTask.css(BTN_ADD_STYLE.default);
    $btnAddTask.removeAttr(ATTR_DISABLED);
  }
});
