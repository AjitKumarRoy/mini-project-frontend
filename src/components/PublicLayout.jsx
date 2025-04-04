import React from 'react';
import Navbar from './Navbar'; // Assuming you have a Navbar component

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Your common navbar */}
      <main>
        {children}
      </main>
      {/* Optional: Footer or other common elements for public pages */}
    </div>
  );
};

export default PublicLayout;