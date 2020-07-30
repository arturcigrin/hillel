import { URL_TODO as URL } from './config';
import Todo from '../view/Todo';
import ModelList from '../model/ModelList';

export default class Controller {
  constructor(rootEl) {
    this.todoView = new Todo(rootEl, {
      onClickBtnAdd: this.onClickBtnAdd,
      onClickBtnDelete: this.onClickBtnDelete,
      onUpdateTodo: this.onUpdateTodo,
    });
    this.listModel = new ModelList(URL);
    this.todoList = [];
    this._init();
  }

  _init() {
    this.listModel
      .getTodoList()
      .then((res) => (this.todoList = res))
      .then(this.todoView.renderModelList)
      .then(this.todoView.insertTemplate);
  }

  onClickBtnAdd = (title) => {
    this.listModel.addTodo(title).then(this.todoView.renderModelList).then(this.todoView.insertTemplate);
  };

  onClickBtnDelete = (id) => {
    this.listModel.removeTodo(id).then(this.todoView.renderModelList).then(this.todoView.insertTemplate);
  };

  onUpdateTodo = (id) => {
    this.listModel.updateTodo(id);
  };
}
