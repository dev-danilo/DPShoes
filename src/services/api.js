import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/danilo49/api-rocketshoes',
});

export default api;
