import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateSpreadsheet from './pages/CreateSpreadsheet'
import SheetDetail from './pages/SheetDetail'
import PrivateRoute from './components/PrivateRoute' // for protected routes
import Layout from './components/Layout'
import './App.css'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="create-spreadsheet" element={<CreateSpreadsheet />} />
        <Route path="sheets/:sheetId" element={<SheetDetail />} />
      </Route>
    </Routes>
  )
}

export default App
