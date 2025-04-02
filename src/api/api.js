import axios from 'axios';

const api = axios.create({
  baseURL: 'https://goog-sheet-backend-avh5gkemdyambdbc.westindia-01.azurewebsites.net/',
  withCredentials: true,  // ✅ Ensures cookies are sent in requests
});

// ✅ Explicitly ensure `withCredentials: true` in all requests
api.interceptors.request.use((config) => {
  config.withCredentials = true; 
  return config;
});

// ✅ Global error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
