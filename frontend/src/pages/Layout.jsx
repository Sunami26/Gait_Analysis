// src/pages/Layout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      {/* Sidebar only from the Sidebar component */}
      <Sidebar />

      {/* Main content rendered via Outlet */}
      <div className="ml-64 flex-1 p-10 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
