import React from 'react';
import { call } from '../api/client.js';

export default function GoalsNew() {
  React.useEffect(() => {
    ['ep1'].forEach((k) => call(k).catch(() => {}));
  }, []);
  return (
    <main data-route="/goals/new">
      <p className="breadcrumb">Home / Goals / New</p>
      <h1>Create a goal</h1>
      <p>Name the goal, pick when it is due, and say who owns it.</p>
      <form name="new_goal" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="new_goal-goal-title">Goal title</label>
        <input id="new_goal-goal-title" name="new_goal-goal-title" />
        <label htmlFor="new_goal-target-date">Target date</label>
        <input id="new_goal-target-date" name="new_goal-target-date" />
        <label htmlFor="new_goal-owner">Owner</label>
        <input id="new_goal-owner" name="new_goal-owner" />
        <label htmlFor="new_goal-priority">Priority</label>
        <input id="new_goal-priority" name="new_goal-priority" />
        <label htmlFor="new_goal-status">Status</label>
        <input id="new_goal-status" name="new_goal-status" />
        <label htmlFor="new_goal-notes">Notes</label>
        <input id="new_goal-notes" name="new_goal-notes" />
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
