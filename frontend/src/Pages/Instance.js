import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://3.36.221.184:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
