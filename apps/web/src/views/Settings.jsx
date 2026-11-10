import React from 'react';

export default function Settings() {
  return (
    <main data-route="/settings">
      <p className="breadcrumb">Home / Settings</p>
      <h1>Preferences</h1>
      <form name="preferences" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="preferences-display-name">Display name</label>
        <input id="preferences-display-name" name="preferences-display-name" required />
        <fieldset>
          <legend>Theme</legend>
          <input type="radio" id="preferences-theme-0" name="preferences-theme" value="Light" />
          <label htmlFor="preferences-theme-0">Light</label>
          <input type="radio" id="preferences-theme-1" name="preferences-theme" value="Dark" />
          <label htmlFor="preferences-theme-1">Dark</label>
          <input type="radio" id="preferences-theme-2" name="preferences-theme" value="System" />
          <label htmlFor="preferences-theme-2">System</label>
        </fieldset>
        <label htmlFor="preferences-language">Language</label>
        <select id="preferences-language" name="preferences-language">
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
        <label htmlFor="preferences-notification-frequency">Notification frequency</label>
        <select id="preferences-notification-frequency" name="preferences-notification-frequency">
          <option value="Immediately">Immediately</option>
          <option value="Daily digest">Daily digest</option>
          <option value="Weekly digest">Weekly digest</option>
        </select>
        <label htmlFor="preferences-enable-two-factor-authentication">Enable two-factor authentication</label>
        <input type="checkbox" id="preferences-enable-two-factor-authentication" name="preferences-enable-two-factor-authentication" />
        <label htmlFor="preferences-time-zone">Time zone</label>
        <select id="preferences-time-zone" name="preferences-time-zone">
          <option value="UTC">UTC</option>
          <option value="Europe/London">Europe/London</option>
          <option value="America/New_York">America/New_York</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
