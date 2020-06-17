class HTTPRequests {
  GET(url) {
    return fetch(url).then((res) => {
      if (res.status === 200 && res.ok) {
        return res.json();
      }
    });
  }
}
