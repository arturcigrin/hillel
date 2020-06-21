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
}
