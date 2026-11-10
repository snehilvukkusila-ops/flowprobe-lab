import React from 'react';

export default function Tasks() {
  return (
    <main data-route="/tasks">
      <p className="breadcrumb">Home / Tasks</p>
      <h1>Tasks</h1>
      <p><span className="badge">Beta</span></p>
      <p>Every open task, who it is assigned to, and its priority.</p>
    </main>
  );
}
