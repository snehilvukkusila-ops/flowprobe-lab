import { useState } from 'react'

export default function InviteMember() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Member')
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true)
  const [accessExpires, setAccessExpires] = useState('')
  const [seatLimit, setSeatLimit] = useState('')
  const [sent, setSent] = useState(false)

  const handleInvite = () => {
    // Client-state only — never a real network submit.
    setSent(true)
  }

  return (
    <div className="card">
      <span className="tag">Invite Member</span>
      <h1>Invite a team member</h1>
      <p>Invitations here are simulated client-side and never sent over the network.</p>

      <div>
        <label htmlFor="invite-email">Email</label>
        <input
          id="invite-email"
          type="email"
          required
          value={email}
          placeholder="teammate@example.com"
          onChange={(e) => {
            setEmail(e.target.value)
            setSent(false)
          }}
        />
      </div>

      <div>
        <label htmlFor="invite-role">Role</label>
        <select id="invite-role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Member</option>
          <option>Admin</option>
          <option>Viewer</option>
        </select>
      </div>

      <div>
        <label htmlFor="invite-welcome-email">
          <input
            id="invite-welcome-email"
            type="checkbox"
            checked={sendWelcomeEmail}
            onChange={(e) => setSendWelcomeEmail(e.target.checked)}
          />
          Send welcome email
        </label>
      </div>

      <div>
        <label htmlFor="invite-expires">Access expires</label>
        <input
          id="invite-expires"
          type="date"
          value={accessExpires}
          onChange={(e) => setAccessExpires(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="invite-seat-limit">Seat limit</label>
        <input
          id="invite-seat-limit"
          type="number"
          min="0"
          value={seatLimit}
          onChange={(e) => setSeatLimit(e.target.value)}
        />
      </div>

      <div>
        {/* "Invite" is deliberately in the pipeline's DEFAULT_DENYLIST verb
            list, so this button should be excluded from click-based
            discovery — InviteMember is still reachable via direct nav link. */}
        <button type="button" onClick={handleInvite} disabled={!email.trim()}>
          Invite
        </button>
      </div>

      {sent && <p role="status">Invitation sent to {email}</p>}
    </div>
  )
}
