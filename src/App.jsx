import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateSpreadsheet from './pages/CreateSpreadsheet';
import SheetDetail from './pages/SheetDetail';
import PrivateRoute from './components/PrivateRoute'; // for protected routes
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import Contact from './pages/Contact';
import About from './pages/About';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout'; // Create a new layout for public pages
import './App.css';

function App() {
  return (
    <Routes>
      {/* Public Routes with PublicLayout (if needed) */}
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
      <Route path="/terms-of-service" element={<PublicLayout><TermsOfServicePage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />

      {/* Protected Routes with Layout */}
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
        {/* No need to redefine public routes here */}
      </Route>
    </Routes>
  );
}

export default App;