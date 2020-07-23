class Todo {
  static CLASS_DONE = 'done';
  static CLASS_TASK = 'task';
  static CLASS_TASK_TITLE = 'task-title';
  static CLASS_BTN_DELETE = 'btn-delete';

  constructor(config) {
    this.config = config;
    this.$taskContainerEl = $('#tasksContainer');
    this.$btnCreate = $('#btnCreate');
    this.$inputTodo = $('#taskInput');
    this.taskTemplate = $('#templateTask').html();

    this.$btnCreate.on('click', this.onClickBtnAddTodo);
    this.$inputTodo.on('input', this.onChangeInput);
    this.$taskContainerEl.on('click', `.${Todo.CLASS_BTN_DELETE}`, this.onClickBtnDelete);
    this.$taskContainerEl.on('click', `.${Todo.CLASS_TASK_TITLE}`, this.onClickTodo);
  }

  onClickBtnDelete = (e) => {
    const idTodo = $(e.target).closest(`.${Todo.CLASS_TASK}`).data('id');
    this.config.onDelete(idTodo);
  };

  onClickBtnAddTodo = (e) => {
    e.preventDefault();

    this.config.onAddTodo({ title: this.getInputValue(), isDone: false });
    this.$inputTodo.val('');
    this.btnDisabled();
  };

  onClickTodo = (e) => {
    const $todoEl = $(e.target).closest(`.${Todo.CLASS_TASK}`);
    const todoId = $todoEl.data('id');

    $todoEl.toggleClass(`${Todo.CLASS_DONE}`);

    this.config.onClickTodo(todoId);
  };

  renderTasksList = (tasks) => tasks.map(this.renderModel).join('\n');

  renderModel = (model) => this.createTemplate(model.todo);

  createTemplate = ({ isDone, id, title }) => {
    return this.taskTemplate
      .replace('{{title}}', title)
      .replace(new RegExp('{{id}}', 'g'), id)
      .replace('{{isDone}}', isDone ? Todo.CLASS_DONE : '');
  };

  insertTemplate = (template) => $(this.$taskContainerEl).html('').append(template);

  onChangeInput = () => this.btnDisabled();

  getInputValue = () => this.$inputTodo.val().trim();

  btnDisabled = () => this.$btnCreate.prop('disabled', !this.getInputValue());
}
