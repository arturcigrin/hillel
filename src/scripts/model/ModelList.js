class ModelList {
  constructor(url) {
    this.url = url;
    this.todoList = [];
  }

  getData = () => {
    return fetch(this.url)
      .then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)))
      .then(this.setData);
  };

  setData = (data) => {
    return (this.todoList = data.map((todo) => {
      const model = new Model(this.url);
      model.setTodo(todo);
      return model;
    }));
  };

  addTodoInList = (todo) => {
    const model = new Model(this.url);
    model.setTodo(todo);

    return (this.todoList = [...this.todoList, model]);
  };

  deleteTodo = (id) => {
    const model = this.todoList.find(({ todo }) => todo.id == id);
    this.todoList = this.todoList.filter(({ todo }) => todo.id != model.todo.id);

    return model.deleteTodo();
  };

  addTodo = (todo) => new Model(this.url).addTodo(todo);

  updateTodo = (id) => {
    const model = this.todoList.find(({ todo }) => todo.id == id);
    model.todo.isDone = !model.todo.isDone;

    return model.updateTodo();
  };
}
