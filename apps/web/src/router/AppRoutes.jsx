import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Goals from '../views/Goals.jsx';
import GoalsNew from '../views/GoalsNew.jsx';
import GoalsIdEdit from '../views/GoalsIdEdit.jsx';
import Reports from '../views/Reports.jsx';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/goals" element={<Goals />} />
        <Route path="/goals/new" element={<GoalsNew />} />
        <Route path="/goals/:id/edit" element={<GoalsIdEdit />} />
        <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}
