import Template from './Template';
const $ = require('jquery');

export default class Todo {
  static CLASS_DONE = 'done';
  static CLASS_TASK = 'task';
  static CLASS_TASK_TITLE = 'task-title';
  static CLASS_BTN_DELETE = 'btn-delete';

  constructor(container, config) {
    this.config = config;
    this.templates = new Template();
    this.insertInEl(container, this.templates.getTemplateContainerTodo());

    this.$taskContainerEl = $('#tasksContainer');
    this.$inputTodo = $('#taskInput');
    this.$btnCreate = $('#btnCreate');

    this.$inputTodo.on('input', this.onChangeInput);
    this.$btnCreate.on('click', this.onClickBtnAdd);
    this.$taskContainerEl.on('click', `.${Todo.CLASS_BTN_DELETE}`, this.onClickBtnDelete);
    this.$taskContainerEl.on('click', `.${Todo.CLASS_TASK_TITLE}`, this.onClickTodo);
  }

  onChangeInput = () => this.btnDisabled();

  onClickBtnAdd = (e) => {
    e.preventDefault();
    this.config.onClickBtnAdd(this.getValueInput());
    this.$inputTodo.val('');
    this.btnDisabled();
  };

  onClickBtnDelete = (e) => {
    e.preventDefault();
    const $el = $(e.target).closest(`.${Todo.CLASS_TASK}`);
    const id = $el.data('id');
    this.config.onClickBtnDelete(id);
  };

  onClickTodo = (e) => {
    const $el = $(e.target).closest(`.${Todo.CLASS_TASK}`);
    const id = $el.data('id');

    $el.toggleClass(`${Todo.CLASS_DONE}`);
    this.config.onUpdateTodo(id);
  };

  insertInEl(el, whatToInsert) {
    $(whatToInsert).appendTo(el);
  }

  renderModelList = (listModel) => listModel.map(this.createTemplate).join('\n');

  createTemplate = ({ todo }) => {
    const { id, isDone, title } = todo;
    return this.templates
      .getTemplateTodo()
      .replace('{{title}}', title)
      .replace(new RegExp('{{id}}', 'g'), id)
      .replace('{{isDone}}', isDone ? Todo.CLASS_DONE : '');
  };

  insertTemplate = (template) => $(this.$taskContainerEl).html('').append(template);

  getValueInput = () => this.$inputTodo.val().trim();

  btnDisabled = () => this.$btnCreate.prop('disabled', !this.getValueInput());
}
