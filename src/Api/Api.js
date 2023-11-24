const API_URL = process.env.REACT_APP_API_URL

class API {
  get = function* (url) {
    console.log(API_URL)
    let jsonData = yield fetch(API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(err => console.log("API BUG", err));
    return jsonData;
  }

  post = function* postApi(url, data) {
    let jsonData = yield fetch(API_URL + url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(err => console.log("API BUG", err));
    return jsonData;
  }

  formPost = function* (url, data) {
    const token = sessionStorage.getItem('token') || '';
    let jsonData = yield fetch(API_URL + url, {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(res => res.json())
      .catch(err => console.log("API BUG", err));
    return jsonData;
  }
}

export const Api = new API();
