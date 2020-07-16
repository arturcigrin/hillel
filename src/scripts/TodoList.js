class TodoList {
  static XHR = new HttpRequest();
  static Loading = new Loading();
  static CLASS_DONE = 'done';
  static CLASS_TASK = 'task';
  static CLASS_TASK_TITLE = 'task-title';
  static CLASS_BTN_DELETE = 'btn-delete';

  constructor(url, taskTemplate, btnCreate, inputEl, taskContainerEl) {
    this.url = url;
    this.taskTemplate = taskTemplate;
    this.$btnCreate = btnCreate;
    this.$btnCreate = btnCreate;
    this.$inputTask = inputEl;
    this.$taskContainerEl = taskContainerEl;
    this.listTask = [];

    this._init();
  }

  _init() {
    TodoList.Loading.loading();
    this.btnDisabled();

    this.getTasks()
      .then(this.setTaskList)
      .then(this.renderTasks)
      .then(this.insertTemplate)
      .catch(TodoList.Loading.error)
      .finally(TodoList.Loading.loadingEnd);

    this.$inputTask.on('input', this.onChangeInput);
    this.$btnCreate.on('click', this.onClickBtnCreate);
    this.$taskContainerEl.on('click', `.${TodoList.CLASS_TASK_TITLE}`, this.onClickTask);
    this.$taskContainerEl.on('click', `.${TodoList.CLASS_BTN_DELETE}`, this.onClickBtnDelete);
  }

  onChangeInput = () => this.btnDisabled();

  onClickBtnCreate = (e) => {
    e.preventDefault();
    TodoList.Loading.loading();

    this.createTask({
      title: this.getInputValue(),
      isDone: false,
    })
      .then(this.addTaskInTaskList)
      .then(this.createTemplate.bind(this))
      .then(this.insertTemplate)
      .then(() => {
        this.$inputTask.val('');
        this.btnDisabled();
      })
      .catch(TodoList.Loading.error)
      .finally(TodoList.Loading.loadingEnd);
  };

  onClickTask = (e) => {
    const $taskEl = $(e.target).parent();
    const task = this.findTask($taskEl.data('id'));
    task.isDone = !task.isDone;
    $taskEl.toggleClass(TodoList.CLASS_DONE);
    this.updateTask(task).catch(TodoList.Loading.error);
  };

  onClickBtnDelete = (e) => {
    if (!this.isDeleteTask()) return;

    const $taskEl = $(e.target).closest(`.${TodoList.CLASS_TASK}`);
    TodoList.Loading.loading();

    this.deleteTask($taskEl.data('id'))
      .then((task) => this.removeTask($taskEl, task.id))
      .catch(TodoList.Loading.error)
      .finally(TodoList.Loading.loadingEnd);
  };

  getTasks() {
    return TodoList.XHR.GET(this.url);
  }

  createTask(task) {
    return TodoList.XHR.POST(this.url, task);
  }

  updateTask(task) {
    return TodoList.XHR.PUT(this.url + `/${task.id}`, task);
  }

  deleteTask(id) {
    return TodoList.XHR.DELETE(this.url + `/${id}`);
  }

  setTaskList = (tasks) => (this.listTask = tasks);

  addTaskInTaskList = (task) => {
    this.listTask = [...this.listTask, task];
    return task;
  };

  findTask = (id) => this.listTask.find((task) => task.id == id);

  renderTasks = (tasks) => tasks.map((task) => this.createTemplate(task)).join('\n');

  createTemplate({ isDone, id, title }) {
    return this.taskTemplate
      .replace('{{title}}', title)
      .replace(new RegExp('{{id}}', 'g'), id)
      .replace('{{isDone}}', isDone ? TodoList.CLASS_DONE : '');
  }

  insertTemplate = (template) => $(template).appendTo(this.$taskContainerEl);

  isDeleteTask = () => confirm('Точно удалить задачу?');

  getInputValue = () => this.$inputTask.val().trim();

  btnDisabled = () => this.$btnCreate.prop('disabled', !this.getInputValue());

  removeTask(el, id) {
    this.listTask = this.listTask.filter((task) => task.id != id);
    el && el.remove();
  }
}
