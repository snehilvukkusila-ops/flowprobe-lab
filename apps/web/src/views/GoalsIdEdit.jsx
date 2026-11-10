import React from 'react';

export default function GoalsIdEdit() {
  return (
    <main data-route="/goals/:id/edit">
      <p className="breadcrumb">Home / Goals / Id / Edit</p>
      <h1>Edit goal</h1>
      <p>Change the target date, owner or status of this goal.</p>
    </main>
  );
}
