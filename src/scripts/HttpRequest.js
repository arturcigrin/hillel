class HttpRequest {
  GET(url) {
    return fetch(url).then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)));
  }

  POST(url, task) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset="utf-8"' },
      body: JSON.stringify(task),
    }).then((res) => (res.ok && res.status === 201 ? res.json() : Promise.reject(res)));
  }

  PUT(url, task) {
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset="utf-8"' },
      body: JSON.stringify(task),
    }).then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)));
  }

  DELETE(url) {
    return fetch(url, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset="utf-8"' },
    }).then((res) => (res.ok && res.status === 200 ? res.json() : Promise.reject(res)));
  }
}
