// Single place for all HTTP calls: base URL, auth header, error handling.
const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

async function handle(res) {
  if (res.status === 401) {
    setToken(null);
    window.location.href = "/login";
    throw new Error("Session expired");
  }
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const data = await res.json();
      if (data.detail) detail = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
    } catch { /* keep statusText */ }
    throw new Error(detail);
  }
  return res.status === 204 ? null : res.json();
}

export async function api(path, { method = "GET", body, params } = {}) {
  const url = new URL(BASE + path, window.location.origin);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== "" && value != null) url.searchParams.set(key, value);
    }
  }
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  return handle(res);
}

export async function login(email, password) {
  const res = await fetch(new URL(BASE + "/auth/login", window.location.origin), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: email, password }),
  });
  const data = await handle(res);
  setToken(data.access_token);
  return data;
}

export async function register(email, username, password) {
  const res = await fetch(new URL(BASE + "/auth/register", window.location.origin), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
  return handle(res);
}
