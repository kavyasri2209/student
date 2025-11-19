import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <div className="sf-app-layout d-flex">
      <Sidebar />
      <div className="sf-main flex-grow-1">
        <Topbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
