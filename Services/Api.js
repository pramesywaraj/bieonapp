import API from 'react-native-config';
const API_URL = API.REACT_APP_API_URI;
const qs = require('qs');

export default class Api {
  async post(url, data, withToken) {
    const headers = withToken
      ? {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      : {
          'Content-Type': 'application/json',
        };

    let response = await fetch(API_URL + url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers,
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      });
    return response;
  }
  async get(url, data, withToken) {
    console.log(url, data, withToken);
    const headers = withToken
      ? {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      : {
          'Content-Type': 'application/json',
        };
    let response = await fetch(API_URL + url + '?' + qs.stringify(data), {
      headers: headers,
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      });
    return response;
  }
  login(data) {
    return this.post('/auth/login', data);
  }
  changepassword(data) {
    return this.post('/change_password', data);
  }
  register(data) {
    return this.post('/api/v1/register', data);
  }
  input_salt_a(data) {
    return this.get('/salt/a/input', data, true);
  }
  add_input_salt_a(data) {
    return this.post('/salt/a/input', data, true);
  }
  update_input_salt_a(id, data) {
    return this.post('/salt/a/input' + id, data, true);
  }
  remove_input_salt_a(id) {
    return this.delete('/salt/a/input' + id, {}, true);
  }
  input_salt_b(data) {
    return this.get('/salt/b/input', data, true);
  }
  add_input_salt_b(data) {
    return this.post('/salt/b/input', data, true);
  }
  update_input_salt_b(id, data) {
    return this.post('/salt/b/input' + id, data, true);
  }
  remove_input_salt_b(id) {
    return this.delete('/salt/b/input' + id, {}, true);
  }
  list_salt_a(data) {
    return this.get('/salt/a/lisr', data, true);
  }
  add_list_salt_a(data) {
    return this.post('/salt/a/list', data, true);
  }
  update_list_salt_a(id, data) {
    return this.post('/salt/a/list' + id, data, true);
  }
  remove_list_salt_a(id) {
    return this.delete('/salt/a/list' + id, {}, true);
  }
  list_salt_b(data) {
    return this.get('/salt/b/lisr', data, true);
  }
  add_list_salt_b(data) {
    return this.post('/salt/b/list', data, true);
  }
  update_list_salt_b(id, data) {
    return this.post('/salt/b/list' + id, data, true);
  }
  remove_list_salt_b(id) {
    return this.delete('/salt/b/list' + id, {}, true);
  }
  getArticle() {
    return this.get('article/list', data, true);
  }
}
