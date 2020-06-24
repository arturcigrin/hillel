class HTTPRequests {
  GET(url) {
    return fetch(url)
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        }
      })
      .catch((err) => console.error(err));
  }

  POST(url, title) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        completed: false,
        title,
      }),
    })
      .then((res) => {
        if (res.ok && res.status === 201) {
          return res.json();
        }
      })
      .catch((err) => console.error(err));
  }

  PUT(url, task) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        }
      })
      .catch((err) => console.error(err));
  }

  DELETE(url) {
    return fetch(url, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.ok;
        }
      })
      .catch((err) => console.error(err));
  }
}
