'use strict';

class TodoList {
  static URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';
  static XHR = new HTTPRequests();
  static INPUT_EL = document.querySelector('#newTask');
  static BUTTON_ADD_TASK = document.querySelector('#addTask');
  static TODO_LIST_EL = document.querySelector('#todoList');
  static CLASS_ITEM = 'task';
  static CLASS_TASK_COMPLETED = 'task-completed';
  static CLASS_BTN_DELETE = 'btn-delete';
  static CLASS_BTN_LOCKED = 'button-blocked';
  static CLASS_TASK = 'task';
  static CLASS_REMOVE_TASK = 'remove-task';
  static ICON_DELETE = '&#10008;';
  static ATTRIBUTE_DATA_ID = 'data-id';

  constructor() {
    this._init();
  }

  static removeClassToElement(el, classToRemove) {
    el.classList.remove(classToRemove);
  }

  static addClassToElement(el, classToAdd) {
    el.classList.add(classToAdd);
  }

  static appendEl(el, whereToInsert) {
    whereToInsert.append(el);
  }

  static getValueInput() {
    return TodoList.INPUT_EL.value;
  }

  static clearInput() {
    TodoList.INPUT_EL.value = '';
  }

  static createUrl(id) {
    return TodoList.URL_TODOS + `/${id}`;
  }

  _init() {
    TodoList.INPUT_EL.addEventListener('input', this.onInput);
    TodoList.BUTTON_ADD_TASK.addEventListener('click', this.onClickBtnAdd);
    TodoList.TODO_LIST_EL.addEventListener('click', this.onClickTodoList);

    this._getListTask()
      .then(this.renderTask)
      .then((allTaskEL) => TodoList.appendEl(allTaskEL, TodoList.TODO_LIST_EL));
  }

  _getListTask() {
    return TodoList.XHR.GET(TodoList.URL_TODOS);
  }

  _createTask(taskValue) {
    return TodoList.XHR.POST(TodoList.URL_TODOS, taskValue);
  }

  _updateStatusTask(url, task) {
    return TodoList.XHR.PUT(url, task);
  }

  _deleteTask(url) {
    return TodoList.XHR.DELETE(url);
  }

  onInput = () => {
    TodoList.BUTTON_ADD_TASK.disabled = this.isEmptyInput();

    this.isEmptyInput()
      ? TodoList.addClassToElement(TodoList.BUTTON_ADD_TASK, TodoList.CLASS_BTN_LOCKED)
      : TodoList.removeClassToElement(TodoList.BUTTON_ADD_TASK, TodoList.CLASS_BTN_LOCKED);
  };

  onClickBtnAdd = (e) => {
    e.preventDefault();
    const valueInput = TodoList.getValueInput();

    TodoList.clearInput();
    TodoList.BUTTON_ADD_TASK.disabled = true;
    TodoList.addClassToElement(TodoList.BUTTON_ADD_TASK, TodoList.CLASS_BTN_LOCKED);

    this._createTask(valueInput)
      .then(this.createElementLi.bind(this))
      .then((taskEl) => TodoList.appendEl(taskEl, TodoList.TODO_LIST_EL));
  };

  onClickTodoList = (e) => {
    switch (true) {
      case e.target.matches(`.${TodoList.CLASS_TASK_COMPLETED}`) || e.target.matches(`.${TodoList.CLASS_TASK}`):
        e.target.classList.toggle(TodoList.CLASS_TASK_COMPLETED);

        this.getTask(e.target.dataset.id)
          .then((task) => {
            task.completed = !task.completed;
            return task;
          })
          .then((modifyTask) => this._updateStatusTask(TodoList.createUrl(modifyTask.id), modifyTask));
        break;
      case e.target.matches(`.${TodoList.CLASS_BTN_DELETE}`):
        this.removeTaskFromScreen(e.target.closest(`[${TodoList.ATTRIBUTE_DATA_ID}]`));
        this._deleteTask(TodoList.createUrl(e.target.closest(`[${TodoList.ATTRIBUTE_DATA_ID}]`).dataset.id));
    }
  };

  isEmptyInput() {
    return !TodoList.INPUT_EL.value.trim().length;
  }

  renderTask = (taskList) => {
    const fragment = document.createDocumentFragment();

    taskList.forEach((task) => fragment.appendChild(this.createElementLi(task)));

    return fragment;
  };

  createElementLi({ id, title, completed }) {
    const li = document.createElement('li');
    TodoList.addClassToElement(li, TodoList.CLASS_ITEM);
    li.textContent = title;
    li.setAttribute(TodoList.ATTRIBUTE_DATA_ID, id);

    if (completed) {
      TodoList.addClassToElement(li, TodoList.CLASS_TASK_COMPLETED);
    }

    li.appendChild(this.createElementSpan());

    return li;
  }

  createElementSpan() {
    const span = document.createElement('span');
    TodoList.addClassToElement(span, TodoList.CLASS_BTN_DELETE);
    span.setAttribute('title', 'Удалить задачу');
    span.insertAdjacentHTML('afterbegin', TodoList.ICON_DELETE);

    return span;
  }

  getTask(id) {
    return TodoList.XHR.GET(TodoList.createUrl(id));
  }

  removeTaskFromScreen(taskEl) {
    TodoList.addClassToElement(taskEl, TodoList.CLASS_REMOVE_TASK);

    setTimeout(() => taskEl.remove(), 500);
  }
}
