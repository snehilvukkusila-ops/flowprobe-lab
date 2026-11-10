import React from 'react';

export default function Invite() {
  return (
    <main data-route="/invite">
      <p className="breadcrumb">Home / Invite</p>
      <h1>Invite a team member</h1>
      <form name="invite" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="invite-email">Email</label>
        <input type="email" id="invite-email" name="invite-email" required />
        <label htmlFor="invite-role">Role</label>
        <select id="invite-role" name="invite-role" required>
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
          <option value="Viewer">Viewer</option>
        </select>
        <label htmlFor="invite-send-welcome-email">Send welcome email</label>
        <input type="checkbox" id="invite-send-welcome-email" name="invite-send-welcome-email" />
        <label htmlFor="invite-access-expires">Access expires</label>
        <input type="date" id="invite-access-expires" name="invite-access-expires" />
        <label htmlFor="invite-seat-limit">Seat limit</label>
        <input type="number" id="invite-seat-limit" name="invite-seat-limit" />
        <button type="submit">Invite</button>
      </form>
    </main>
  );
}
