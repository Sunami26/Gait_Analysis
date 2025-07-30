// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  UploadCloud,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { name: 'Upload Video', icon: <UploadCloud size={20} />, path: '/upload' },
  //  { name: 'All Videos', icon: <BarChart3 size={20} />, path: '/all-videos' },
    { name: 'Reports', icon: <BarChart3 size={20} />, path: '/reports' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="w-64 h-screen fixed bg-blue-100 p-6 shadow-lg flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-blue-700 mb-10">GaitPhysio</h1>
        <ul className="space-y-3">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition 
                ${isActive
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-700 hover:bg-blue-200'}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <li
          onClick={handleLogout}
          className="list-none flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer 
          text-red-600 hover:bg-red-100"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
