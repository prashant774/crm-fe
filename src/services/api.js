const BASE = "http://localhost:5000/api";

/** Build URL, stripping empty/null/undefined query params */
function url(endpoint, params = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined,
    ),
  );
  const qs = new URLSearchParams(clean).toString();
  return qs ? `${BASE}${endpoint}?${qs}` : `${BASE}${endpoint}`;
}

function get(endpoint, params) {
  return fetch(url(endpoint, params)).then((r) => {
    if (!r.ok) throw new Error(`API error ${r.status}: ${endpoint}`);
    return r.json();
  });
}

/** POST helper — rejects with the parsed JSON error body on non-2xx */
function post(endpoint, body) {
  return fetch(`${BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json().then((d) => (r.ok ? d : Promise.reject(d))));
}

export const loginUser = (email, password) =>
  post("/auth/login", { email, password });

export const fetchKPI = (params) => get("/sales/kpi", params);
export const fetchByRegion = (params) => get("/sales/by-region", params);
export const fetchByCategory = (params) => get("/sales/by-category", params);
export const fetchTopProducts = (params) =>
  get("/sales/top-products", { limit: 10, ...params });
export const fetchTrends = (params) => get("/sales/trends", params);
export const fetchTopReps = (params) =>
  get("/sales/top-reps", { limit: 6, ...params });
export const fetchRegionCategory = (params) =>
  get("/sales/region-category", params);
export const fetchRaw = (params) => get("/sales/raw", params);
