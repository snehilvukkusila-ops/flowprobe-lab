export const ENDPOINTS = {
  ep0: { method: 'GET', path: '/api/goals' },
  ep1: { method: 'GET', path: '/api/goals/owners' },
};

export async function call(key, params = {}) {
  const spec = ENDPOINTS[key];
  const path = spec.path.replace(/\{(\w+)\}/g, (_, k) => params[k]);
  return fetch(path, { method: spec.method });
}
