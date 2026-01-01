import { useState } from 'react'

export default function Settings() {
  const [theme, setTheme] = useState('system')
  const [language, setLanguage] = useState('English')
  const [frequency, setFrequency] = useState('weekly')
  const [twoFactor, setTwoFactor] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Client-state only — never a real network submit (safety interceptor
    // blocks non-GET requests, and this page models that honestly).
    setSaved(true)
  }

  return (
    <div className="card">
      <span className="tag">Settings</span>
      <h1>Preferences</h1>
      <p>Update your preferences below. Nothing here submits over the network.</p>

      <fieldset>
        <legend>Theme</legend>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === 'light'}
            onChange={(e) => setTheme(e.target.value)}
          />
          Light
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.value)}
          />
          Dark
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="system"
            checked={theme === 'system'}
            onChange={(e) => setTheme(e.target.value)}
          />
          System
        </label>
      </fieldset>

      <div>
        <label htmlFor="settings-language">Language</label>
        <select
          id="settings-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      <div>
        <label htmlFor="settings-frequency">Notification frequency</label>
        <select
          id="settings-frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="never">Never</option>
        </select>
      </div>

      <div>
        <label htmlFor="settings-2fa">
          <input
            id="settings-2fa"
            type="checkbox"
            checked={twoFactor}
            onChange={(e) => setTwoFactor(e.target.checked)}
          />
          Enable two-factor authentication
        </label>
      </div>

      <div>
        <label htmlFor="settings-display-name">Display name</label>
        <input
          id="settings-display-name"
          type="text"
          required
          value={displayName}
          placeholder="Jane Doe"
          onChange={(e) => {
            setDisplayName(e.target.value)
            setSaved(false)
          }}
        />
      </div>

      <div>
        <button type="button" onClick={handleSave} disabled={!displayName.trim()}>
          Save
        </button>
      </div>

      {saved && <p role="status">Saved</p>}
    </div>
  )
}
