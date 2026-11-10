import React from 'react';

export default function Dashboard() {
  return (
    <main data-route="/dashboard">
      <p className="breadcrumb">Home / Dashboard</p>
      <h1>Team Dashboard</h1>
      <p>A read-only overview of team activity.</p>
      <div className="actions"><button type="button">Refresh</button></div>
    </main>
  );
}
