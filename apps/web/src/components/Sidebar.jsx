import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav aria-label="Main">
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}
