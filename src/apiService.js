import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/auth';

const apiService = {
  register: (userData) => axios.post(`${API_BASE_URL}/register`, userData),
  login: (userData) => axios.post(`${API_BASE_URL}/login`, userData),
};

export default apiService;
