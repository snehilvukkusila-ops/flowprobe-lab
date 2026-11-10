import React from 'react';

export default function CatchAll() {
  return (
    <main data-route="/*">
      <p className="breadcrumb">Home / *</p>
      <h1>Page not found</h1>
    </main>
  );
}
