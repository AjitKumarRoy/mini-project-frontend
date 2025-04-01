import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true) // Add loading state
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, []) // Runs only on component mount

  async function checkAuth() {
    try {
      const res = await api.get('/api/auth/profile', { withCredentials: true })
      console.log("Auth success:", res.data)
      setIsAuthenticated(true)
    } catch (err) {
      console.error("Auth failed:", err.response ? err.response.data : err)
      setIsAuthenticated(false)
    } finally {
      setLoading(false) // Ensure loading stops
    }
  }

  async function login() {
    try {
      const res = await api.post('/api/auth/login', { withCredentials: true })
      console.log("Login success:", res.data)

      setIsAuthenticated(true)
      navigate('/') // Redirect to dashboard after successful login
    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data : err)
      setIsAuthenticated(false)
    }
  }

  async function logout() {
    try {
      await api.post('/api/auth/logout', { withCredentials: true })
      setIsAuthenticated(false)
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return { isAuthenticated, loading, login, logout }
}
