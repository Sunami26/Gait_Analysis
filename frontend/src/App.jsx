import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Layout from './pages/Layout';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import AllVideos from './pages/AllVideos';

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected routes with sidebar (Layout) */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/all-videos" element={<AllVideos />} />
       
      </Route>
    </Routes>
  );
}

export default App;
