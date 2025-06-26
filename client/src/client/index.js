import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 30000,
  withCredentials: true
}); 