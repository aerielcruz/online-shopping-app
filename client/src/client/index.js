import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL//'https://doodleverse-c8cdf6cybmcua3fv.australiaeast-01.azurewebsites.net'

export const client = axios.create({
  baseURL: (apiUrl || 'http://localhost:3000') + '/api/v1',
  timeout: 30000,
  withCredentials: true
}); 