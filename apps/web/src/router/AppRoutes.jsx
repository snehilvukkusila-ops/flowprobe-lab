import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard.jsx';
import Team from '../views/Team.jsx';
import Invite from '../views/Invite.jsx';
import Settings from '../views/Settings.jsx';
import CreateReport from '../views/CreateReport.jsx';
import CreateReportStep2 from '../views/CreateReportStep2.jsx';
import Workspace from '../views/Workspace.jsx';
import AdminWorkspace from '../views/AdminWorkspace.jsx';
import Profile from '../views/Profile.jsx';
import CatchAll from '../views/CatchAll.jsx';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/create-report/step-2" element={<CreateReportStep2 />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/admin/workspace" element={<AdminWorkspace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<CatchAll />} />
    </Routes>
  );
}
