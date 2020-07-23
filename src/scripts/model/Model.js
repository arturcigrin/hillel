class Model {
  constructor(url) {
    this.baseUrl = url;
    this.todo = {};
  }

  setTodo(data) {
    this.todo = data;
  }

  deleteTodo() {
    return fetch(this.baseUrl + `/${this.todo.id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset="utf-8"' },
    }).then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)));
  }

  addTodo(todo) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset="utf-8"' },
      body: JSON.stringify(todo),
    }).then((res) => (res.ok && res.status === 201 ? res.json() : Promise.reject(res)));
  }

  updateTodo() {
    return fetch(this.baseUrl + `/${this.todo.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset="utf-8"' },
      body: JSON.stringify(this.todo),
    }).then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)));
  }
}
