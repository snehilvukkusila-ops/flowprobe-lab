import React from 'react';

export default function Profile() {
  return (
    <main data-route="/profile">
      <p className="breadcrumb">Home / Profile</p>
      <h1>Profile</h1>
      <p>Your display name and the teammate assigned to review your tasks.</p>
      <form name="profile" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="profile-display-name">Display name</label>
        <input id="profile-display-name" name="profile-display-name" aria-describedby="profile-display-name-help" />
        <p id="profile-display-name-help">Questions? Write to owner@probe-fields.test</p>
        <label htmlFor="profile-assignee">Assignee</label>
        <select id="profile-assignee" name="profile-assignee">
          <option value="Dana Whitfield">Dana Whitfield</option>
          <option value="Arun Patel">Arun Patel</option>
          <option value="Mei Chen">Mei Chen</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
