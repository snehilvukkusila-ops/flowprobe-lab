import React from 'react';

export default function Workspace() {
  return (
    <main data-route="/workspace">
      <p className="breadcrumb">Home / Workspace</p>
      <h1>Workspace</h1>
      <form name="workspace" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="workspace-workspace-name">Workspace name</label>
        <input id="workspace-workspace-name" name="workspace-workspace-name" required />
        <label htmlFor="workspace-workspace-url">Workspace URL</label>
        <input id="workspace-workspace-url" name="workspace-workspace-url" />
        <button type="submit">Save workspace</button>
      </form>
    </main>
  );
}
