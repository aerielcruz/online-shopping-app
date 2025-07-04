import axios from 'axios'

const apiUrl = 'https://hct2egtfna.ap-southeast-2.awsapprunner.com'

export const client = axios.create({
  baseURL: (apiUrl || 'http://localhost:3000') + '/api/v1',
  timeout: 30000,
  withCredentials: true
}); 