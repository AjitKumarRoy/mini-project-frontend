import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://goog-sheet-backend-avh5gkemdyambdbc.westindia-01.azurewebsites.net/',
  withCredentials: true, // important if your backend sets HttpOnly cookies
})

// Optional: Add interceptors for error handling or request headers
api.interceptors.response.use(
  response => response,
  error => {
    // global error handling
    return Promise.reject(error)
  }
)

export default api
