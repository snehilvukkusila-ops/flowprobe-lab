import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes.jsx';
import Sidebar from './components/Sidebar.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/probe-pages">
    <Sidebar />
    <AppRoutes />
  </BrowserRouter>
);
