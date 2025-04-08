// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { SpreadsheetProvider } from '../contexts/SpreadsheetContext'; // Import the provider

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SpreadsheetProvider> {/* Wrap the components that need the context */}
        <Navbar />
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </SpreadsheetProvider>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;