import React from 'react';

export default function Team() {
  return (
    <main data-route="/team">
      <p className="breadcrumb">Home / Team</p>
      <h1>Team</h1>
      <p><span className="badge">Active</span><span className="badge">Away</span><span className="badge">Offline</span></p>
      <p>Everyone on your team, with their role and status.</p>
    </main>
  );
}
