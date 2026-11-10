import React from 'react';

export default function CreateReport() {
  return (
    <main data-route="/create-report">
      <p className="breadcrumb">Home / Create Report</p>
      <h1>Create a new report</h1>
      <p>Step 1 of 2 — Name your report.</p>
      <form name="create_report" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="create_report-report-title">Report title</label>
        <input id="create_report-report-title" name="create_report-report-title" required />
      </form>
    </main>
  );
}
