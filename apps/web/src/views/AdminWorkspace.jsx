import React from 'react';

export default function AdminWorkspace() {
  return (
    <main data-route="/admin/workspace">
      <p className="breadcrumb">Home / Admin / Workspace</p>
      <h1>Workspace policy</h1>
      <form name="workspace_policy" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="workspace_policy-data-retention-days">Data retention days</label>
        <input type="number" id="workspace_policy-data-retention-days" name="workspace_policy-data-retention-days" />
        <label htmlFor="workspace_policy-allowed-email-domain">Allowed email domain</label>
        <input id="workspace_policy-allowed-email-domain" name="workspace_policy-allowed-email-domain" />
        <button type="submit">Apply policy</button>
      </form>
    </main>
  );
}
