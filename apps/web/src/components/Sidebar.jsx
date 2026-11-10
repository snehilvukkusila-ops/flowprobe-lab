import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav aria-label="Main">
      <NavLink to="/goals">Goals</NavLink>
      <NavLink to="/reports">Reports</NavLink>
    </nav>
  );
}
