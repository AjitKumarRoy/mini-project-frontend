import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-4 bg-white shadow-md rounded"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <label className="block mb-2">
          <span>Email</span>
          <input
            type="email"
            className="mt-1 block w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2">
          <span>Password</span>
          <input
            type="password"
            className="mt-1 block w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded mt-4"
        >
          Login
        </button>
        { 
          <a href="https://goog-sheet-backend-avh5gkemdyambdbc.westindia-01.azurewebsites.net/api/auth/google" 
             className="block text-center mt-4">
            Sign in with Google
          </a>
        }
      </form>
    </div>
  )
}

export default Login
