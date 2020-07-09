class HTTPRequests {
  GET(url) {
    return fetch(url).then((res) => {
      if (res.ok && res.status === 200) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  POST(url, stickers) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(stickers),
    }).then((res) => {
      if (res.ok && res.status === 201) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  PUT(url, task) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(task),
    }).then((res) => {
      if (res.ok && res.status === 200) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  DELETE(url) {
    return fetch(url, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok && res.status === 200) {
        return res.ok;
      } else {
        return Promise.reject(res.status);
      }
    });
  }
}
