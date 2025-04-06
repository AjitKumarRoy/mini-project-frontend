import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateSpreadsheet from "./pages/CreateSpreadsheet";
import SheetDetail from "./pages/SheetDetail";
import PrivateRoute from "./components/PrivateRoute";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import "./App.css";
import "./styles/custom.css";
import api from "./api/api";

function App() {
  // tracking views, increment the view count by only 1 per session
  const [hasViewedSession, setHasViewedSession] = useState(() => {
    return sessionStorage.getItem("hasViewedApp") === "true";
  });

  useEffect(() => {
    const trackInitialView = async () => {
      if (!hasViewedSession) {
        try {
          await api.get("/"); // Your backend route with trackIPViews
          sessionStorage.setItem("hasViewedApp", "true");
          setHasViewedSession(true);
          console.log("App view tracked (initial session - App.jsx)");
        } catch (error) {
          console.error("Error tracking initial app view (App.jsx):", error);
        }
      }
    };

    trackInitialView();
  }, [hasViewedSession]);

  return (
    <Routes>
      {/* Public Routes with PublicLayout (if needed) */}
      <Route
        path="/home"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <PublicLayout>
            <PrivacyPolicyPage />
          </PublicLayout>
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <PublicLayout>
            <TermsOfServicePage />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

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
