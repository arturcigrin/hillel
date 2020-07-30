export default class Model {
  constructor(todo, url) {
    this.baseUrl = url;
    this.todo = {};
    this.setTodo(todo);
  }

  setTodo = (todo) => (this.todo = todo);

  createTodo(todo) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset="utf-8"',
      },
      body: JSON.stringify(todo),
    })
      .then((res) => (res.ok && res.status === 201 ? res.json() : Promise.reject(res)))
      .then(this.setTodo);
  }

  deleteTodo(todo) {
    return fetch(`${this.baseUrl}/${this.todo.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset="utf-8"',
      },
    }).then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)));
  }

  updateTodo() {
    this.todo.isDone = !this.todo.isDone;

    return fetch(`${this.baseUrl}/${this.todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset="utf-8"',
      },
      body: JSON.stringify(this.todo),
    }).then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)));
  }
}
