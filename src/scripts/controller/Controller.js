const TODOS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos';

class Controller {
  constructor() {
    this.todoCollection = new ModelList(TODOS_URL);
    this.todoView = new Todo({
      onDelete: this.onDelete,
      onAddTodo: this.onAddTodo,
      onClickTodo: this.onClickTodo,
    });

    this.loadingView = new Loading();

    this._init();
  }

  _init() {
    this.loadingView.loading();
    this.todoCollection
      .getData()
      .then(this.todoView.renderTasksList)
      .then(this.todoView.insertTemplate)
      .catch(this.loadingView.error)
      .finally(this.loadingView.loadingEnd);
  }

  onDelete = (id) => {
    this.loadingView.loading();

    this.todoCollection
      .deleteTodo(id)
      .then(this.todoView.renderTasksList.bind(null, this.todoCollection.todoList))
      .then(this.todoView.insertTemplate)
      .catch(this.loadingView.error)
      .finally(this.loadingView.loadingEnd);
  };

  onAddTodo = (todo) => {
    this.loadingView.loading();

    this.todoCollection
      .addTodo(todo)
      .then(this.todoCollection.addTodoInList)
      .then(this.todoView.renderTasksList)
      .then(this.todoView.insertTemplate)
      .catch(this.loadingView.error)
      .finally(this.loadingView.loadingEnd);
  };

  onClickTodo = (id) => {
    this.loadingView.loading();

    this.todoCollection.updateTodo(id).catch(this.loadingView.error).finally(this.loadingView.loadingEnd);
  };
}
