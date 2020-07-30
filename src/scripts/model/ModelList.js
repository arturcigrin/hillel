import Template from '../view/Template';
import Loading from '../view/Loading';
import Model from './Model';

export default class ModelList {
  constructor(url) {
    this.url = url;
    this.loading = new Loading();
    this.template = new Template();
    this.listTodo = [];
  }

  getTodoList() {
    this.loading.load();
    return fetch(this.url)
      .then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)))
      .then(this.setListTodo)
      .catch(this.loading.error)
      .finally(this.loading.loadingEnd);
  }

  setListTodo = (todos) => {
    return (this.listTodo = todos.map((todo) => {
      const model = new Model(todo, this.url);
      return model;
    }));
  };

  addTodoInList = (todo) => {
    const model = new Model(todo, this.url);
    return (this.listTodo = [...this.listTodo, model]);
  };

  searchTodo = (id) => this.listTodo.find(({ todo }) => todo.id == id);

  addTodo(title) {
    this.loading.load();

    return new Model({ title, isDone: false }, this.url)
      .createTodo()
      .then(this.addTodoInList)
      .catch(this.loading.error)
      .finally(this.loading.loadingEnd);
  }

  removeTodo(id) {
    this.loading.load();
    return this.searchTodo(id)
      .deleteTodo()
      .then(({ id }) => this.listTodo.filter(({ todo }) => todo.id != id))
      .catch(this.loading.error)
      .finally(this.loading.loadingEnd);
  }

  updateTodo = (id) => {
    this.loading.load();

    const todo = this.searchTodo(id);

    todo.updateTodo().catch(this.loading.error).finally(this.loading.loadingEnd);
  };
}
