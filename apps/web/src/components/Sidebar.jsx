import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav aria-label="Main">
      <NavLink to="/team">Team</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <button type="button">Sign out</button>
    </nav>
  );
}
