'use strict';

class TodoList {
  static BODY_TABLE_EL = document.querySelector('#bodyTodoList');

  static URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';
  static CLASS_COMPLETED_TASK = 'bg-completedTask';
  static CLASS_BTN_REMOVE = 'btn-remove';
  static CLASS_BG_REMOVE = 'bg-remove';
  static CLASS_LIST_TABLE_TD = 'list_table-td';
  static CLASS_NONE = 'none';
  static ICON_CLOSE = '&#10008;';
  static ATTRIBUTE_DATA_ID = '[data-id]';
  static COPY_TASK_LIST = null;

  constructor(element) {
    this._element = element;
    this._init();
  }

  static addClassToElement(el, classToAdd) {
    el.classList.add(classToAdd);
  }

  static removeClassElement(el, classToRemove) {
    el.classList.remove(classToRemove);
  }

  static createElements({ id, completed, title }) {
    const trEl = document.createElement('tr');
    trEl.setAttribute('data-id', id);

    const titleTdEl = document.createElement('td');
    titleTdEl.textContent = title;
    TodoList.addClassToElement(titleTdEl, TodoList.CLASS_LIST_TABLE_TD);

    const idTdEl = document.createElement('td');
    idTdEl.textContent = id;
    TodoList.addClassToElement(idTdEl, TodoList.CLASS_LIST_TABLE_TD);

    if (completed) {
      TodoList.addClassToElement(idTdEl, TodoList.CLASS_COMPLETED_TASK);
      TodoList.addClassToElement(titleTdEl, TodoList.CLASS_COMPLETED_TASK);
    }

    const spanEl = document.createElement('span');
    TodoList.addClassToElement(spanEl, TodoList.CLASS_BTN_REMOVE);
    spanEl.setAttribute('title', 'Удалит задачу');
    spanEl.insertAdjacentHTML('afterbegin', TodoList.ICON_CLOSE);

    titleTdEl.appendChild(spanEl);
    trEl.appendChild(idTdEl);
    trEl.appendChild(titleTdEl);

    return trEl;
  }

  static removeTask(el) {
    el.remove();
  }

  static removeTaskFromTaskList(id, taskList = TodoList.COPY_TASK_LIST) {
    const taskIndex = taskList.findIndex((task) => task.id === +id);
    taskList.splice(taskIndex, 1);
  }

  async _init() {
    await this._getTodoList(new HTTPRequests()).then((taskList) => {
      TodoList.COPY_TASK_LIST = [...taskList];
    });

    const allTasksInEl = this.iterateTasks(TodoList.COPY_TASK_LIST);

    this.insertTasksInTable(allTasksInEl);
    this.showTasks();

    TodoList.BODY_TABLE_EL.addEventListener('click', this.onClickTask);
  }

  _getTodoList(xhr) {
    return xhr.GET(TodoList.URL_TODOS).then((taskList) => taskList);
  }

  iterateTasks(tasksList) {
    const fragment = document.createDocumentFragment();

    tasksList.forEach((task) => {
      fragment.appendChild(TodoList.createElements(task));
    });

    return fragment;
  }

  insertTasksInTable(tasksEL) {
    TodoList.BODY_TABLE_EL.appendChild(tasksEL);
  }

  showTasks() {
    TodoList.removeClassElement(this._element, TodoList.CLASS_NONE);
  }

  onClickTask(e) {
    if (e.target.matches(`.${TodoList.CLASS_BTN_REMOVE}`)) {
      setTimeout(() => {
        TodoList.removeTask(e.target.closest(`${TodoList.ATTRIBUTE_DATA_ID}`));
      }, 650);

      TodoList.removeTaskFromTaskList(e.target.closest(`${TodoList.ATTRIBUTE_DATA_ID}`).dataset.id);
      TodoList.addClassToElement(e.target.closest(`${TodoList.ATTRIBUTE_DATA_ID}`), TodoList.CLASS_BG_REMOVE);
    }
  }
}
