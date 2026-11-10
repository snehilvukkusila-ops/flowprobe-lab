import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tasks from '../views/Tasks.jsx';
import TasksNew from '../views/TasksNew.jsx';
import Profile from '../views/Profile.jsx';
import About from '../views/About.jsx';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/new" element={<TasksNew />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
    </Routes>
  );
}
