export const ENDPOINTS = {
};

export async function call(key, params = {}) {
  const spec = ENDPOINTS[key];
  const path = spec.path.replace(/\{(\w+)\}/g, (_, k) => params[k]);
  return fetch(path, { method: spec.method });
}
