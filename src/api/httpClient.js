import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://89.111.172.219/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;