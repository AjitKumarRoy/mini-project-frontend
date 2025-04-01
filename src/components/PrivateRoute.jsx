import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <p>Loading...</p> // Prevent premature redirect

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
