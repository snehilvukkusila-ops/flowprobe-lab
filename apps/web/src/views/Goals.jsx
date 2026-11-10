import React from 'react';
import { call } from '../api/client.js';

export default function Goals() {
  React.useEffect(() => {
    ['ep0'].forEach((k) => call(k).catch(() => {}));
  }, []);
  return (
    <main data-route="/goals">
      <p className="breadcrumb">Home / Goals</p>
      <h1>Goals</h1>
      <p>Every goal on your plan, with its owner and target date.</p>
    </main>
  );
}
